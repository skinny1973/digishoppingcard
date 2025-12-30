import './style.css'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import bwipjs from 'bwip-js'
import { createIcons, Plus, X, Camera, Trash2, Smartphone, Settings, Download, Upload } from 'lucide'

// --- State Management ---
let cards = JSON.parse(localStorage.getItem('loyalty_cards') || '[]')
let currentScanner = null
let currentCardId = null
let userCoords = null // Current GPS position
const NEARBY_THRESHOLD = 500 // meters
const NEARBY_BOOST = 10000 // Boost for sorting cards nearby

// --- DOM Elements ---
const cardGrid = document.getElementById('cardGrid')
const emptyState = document.getElementById('emptyState')
const addModal = document.getElementById('addModal')
const viewModal = document.getElementById('viewModal')
const addCardBtn = document.getElementById('addCardBtn')
const closeAddModal = document.getElementById('closeAddModal')
const closeViewModal = document.getElementById('closeViewModal')
const saveCardBtn = document.getElementById('saveCardBtn')
const startScanBtn = document.getElementById('startScanBtn')
const deleteCardBtn = document.getElementById('deleteCardBtn')
const closeViewBtn = document.getElementById('closeViewBtn')
const settingsBtn = document.getElementById('settingsBtn')
const settingsModal = document.getElementById('settingsModal')
const closeSettingsModal = document.getElementById('closeSettingsModal')
const exportBtn = document.getElementById('exportBtn')
const importFile = document.getElementById('importFile')

// Form inputs
const storeNameInput = document.getElementById('storeName')
const barcodeValueInput = document.getElementById('barcodeValue')

// View elements
const viewStoreName = document.getElementById('viewStoreName')
const viewBarcodeValue = document.getElementById('viewBarcodeValue')
const barcodeCanvasContainer = document.getElementById('barcodeCanvasContainer')

// --- Utilities ---
const saveToStorage = () => {
  localStorage.setItem('loyalty_cards', JSON.stringify(cards))
  renderCards()
}

const generateId = () => Math.random().toString(36).substr(2, 9)



// --- Geolocation Utilities ---
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3 // metres
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lon2 - lon1) * Math.PI / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

const updateLocation = () => {
  if (!navigator.geolocation) return
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude }
      renderCards()
    },
    (err) => console.warn('Geolocation error:', err),
    { enableHighAccuracy: true }
  )
}

const verifyAndRecordLocation = async (card, coords) => {
  try {
    // Check if we already have this location (avoid duplicates within 300m)
    const alreadySaved = (card.locations || []).some(loc =>
      getDistance(coords.lat, coords.lon, loc.lat, loc.lon) < 300
    )
    if (alreadySaved) return

    // Cross-check with OpenStreetMap (Nominatim)
    // We search for the card name near the current coordinates
    const query = encodeURIComponent(card.name)
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&lat=${coords.lat}&lon=${coords.lon}&limit=5`

    // Respect Nominatim Usage Policy (add User-Agent)
    const response = await fetch(url, {
      headers: { 'User-Agent': 'DigiShoppingCard-PWA-App' }
    })
    const data = await response.json()

    // Verify if any result is close enough (within threshold)
    const isValidLocation = data.some(result => {
      const dist = getDistance(coords.lat, coords.lon, parseFloat(result.lat), parseFloat(result.lon))
      return dist < NEARBY_THRESHOLD
    })

    if (isValidLocation) {
      if (!card.locations) card.locations = []
      card.locations.push({ lat: coords.lat, lon: coords.lon, timestamp: Date.now() })
      saveToStorage()
      console.log(`Posizione registrata per ${card.name}`)
    } else {
      console.log(`Posizione non verificata per ${card.name} (nessun riscontro nearby)`)
    }
  } catch (err) {
    console.error('Learning error:', err)
  }
}

// --- Barcode Generation ---
const renderBarcode = (text) => {
  barcodeCanvasContainer.innerHTML = '<canvas id="barcodeCanvas"></canvas>'
  try {
    let bcid = 'code128'
    // Simplified detection logic
    if (/^\d{8}$/.test(text)) bcid = 'ean8'
    else if (/^\d{12}$/.test(text)) bcid = 'upca'
    else if (/^\d{13}$/.test(text)) bcid = 'ean13'
    else if (text.length > 30 || text.includes('http')) bcid = 'qrcode'

    bwipjs.toCanvas('barcodeCanvas', {
      bcid: bcid,
      text: text,
      scale: 3,
      height: 15,
      includetext: true,
      textxalign: 'center',
    })
  } catch (e) {
    console.error('Barcode generation error:', e)
    barcodeCanvasContainer.innerHTML = '<p style="color:red">Errore generazione barcode. Assicurati che il codice sia valido.</p>'
  }
}

// --- UI Actions ---
const colors = [
  'linear-gradient(135deg, #6366f1, #a855f7)',
  'linear-gradient(135deg, #f43f5e, #fb923c)',
  'linear-gradient(135deg, #10b981, #3b82f6)',
  'linear-gradient(135deg, #f59e0b, #d946ef)',
  'linear-gradient(135deg, #06b6d4, #8b5cf6)'
]

const renderCards = () => {
  cardGrid.innerHTML = ''
  if (cards.length === 0) {
    emptyState.style.display = 'flex'
    emptyState.style.flexDirection = 'column'
    emptyState.style.alignItems = 'center'
    emptyState.innerHTML = `
      <div class="empty-state-icon">🪪</div>
      <p>Non hai ancora aggiunto nessuna carta.</p>
      <p>Tocca il tasto + per iniziare!</p>
    `
  } else {
    emptyState.style.display = 'none'
    const sortedCards = [...cards].sort((a, b) => {
      let scoreA = a.usageCount || 0
      let scoreB = b.usageCount || 0

      // Location Boost
      if (userCoords) {
        const isANearby = (a.locations || []).some(loc =>
          getDistance(userCoords.lat, userCoords.lon, loc.lat, loc.lon) < NEARBY_THRESHOLD
        )
        const isBNearby = (b.locations || []).some(loc =>
          getDistance(userCoords.lat, userCoords.lon, loc.lat, loc.lon) < NEARBY_THRESHOLD
        )
        if (isANearby) scoreA += NEARBY_BOOST
        if (isBNearby) scoreB += NEARBY_BOOST
      }

      if (scoreB !== scoreA) return scoreB - scoreA
      return a.name.localeCompare(b.name)
    })

    sortedCards.forEach((card, index) => {
      const cardEl = document.createElement('div')
      cardEl.className = 'loyalty-card'
      cardEl.onclick = () => openViewModal(card)
      cardEl.style.background = colors[index % colors.length]

      const initials = document.createElement('div')
      initials.className = 'card-logo-initials'
      initials.textContent = card.name[0]?.toUpperCase() || 'C'

      const name = document.createElement('div')
      name.className = 'card-name'
      name.textContent = card.name

      cardEl.appendChild(initials)
      cardEl.appendChild(name)
      cardGrid.appendChild(cardEl)
    })
  }
}

const openAddModal = () => {
  addModal.classList.add('active')
  // Reset form
  storeNameInput.value = ''
  barcodeValueInput.value = ''
  document.getElementById('reader').innerHTML = '' // Clear scanner div
}

const closeAddModalFn = () => {
  addModal.classList.remove('active')
  if (currentScanner) {
    currentScanner.stop().catch(console.error)
    currentScanner = null
  }
}

const openViewModal = (card) => {
  currentCardId = card.id
  viewStoreName.textContent = card.name
  viewBarcodeValue.textContent = card.code
  viewModal.classList.add('active')

  // Increment usage count
  card.usageCount = (card.usageCount || 0) + 1
  saveToStorage()

  // Background Learning: verify location if card is used
  if (userCoords) {
    verifyAndRecordLocation(card, userCoords)
  }

  // Set screen brightness to max if possible (not directly possible in web, 
  // but we can suggest it or use a very white background)

  setTimeout(() => {
    renderBarcode(card.code)
  }, 100)
}

const closeViewModalFn = () => {
  viewModal.classList.remove('active')
}

const openSettingsModal = () => {
  settingsModal.classList.add('active')
}

const closeSettingsModalFn = () => {
  settingsModal.classList.remove('active')
}

// --- Crypto Utilities for Backup ---
const arrayBufferToBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

const base64ToArrayBuffer = (base64) => {
  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

const getEncryptionKey = async (password, salt) => {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

const encryptData = async (data, password) => {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await getEncryptionKey(password, salt)
  const enc = new TextEncoder()
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(JSON.stringify(data))
  )

  return {
    version: 'encrypted-v1',
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
    data: arrayBufferToBase64(ciphertext)
  }
}

const decryptData = async (encryptedObj, password) => {
  try {
    const salt = base64ToArrayBuffer(encryptedObj.salt)
    const iv = base64ToArrayBuffer(encryptedObj.iv)
    const ciphertext = base64ToArrayBuffer(encryptedObj.data)
    const key = await getEncryptionKey(password, new Uint8Array(salt))

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(iv) },
      key,
      ciphertext
    )

    const dec = new TextDecoder()
    return JSON.parse(dec.decode(decrypted))
  } catch (e) {
    throw new Error('Password errata o file corrotto.')
  }
}

// --- Backup & Restore Logic ---
const exportCards = async () => {
  const password = prompt('Inserisci una password per proteggere il tuo backup (lascia vuoto per non cifrare):')

  let finalData
  if (password) {
    finalData = await encryptData(cards, password)
  } else {
    finalData = cards
  }

  const dataStr = JSON.stringify(finalData, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const exportFileDefaultName = `card_wallet_backup_${new Date().toISOString().split('T')[0]}.json`

  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

const importCards = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async (event) => {
    try {
      let imported = JSON.parse(event.target.result)

      // Check if encrypted
      if (imported.version === 'encrypted-v1') {
        const password = prompt('Questo backup è cifrato. Inserisci la password:')
        if (!password) return
        try {
          imported = await decryptData(imported, password)
        } catch (err) {
          alert(err.message)
          return
        }
      }

      if (Array.isArray(imported)) {
        if (confirm(`Hai caricato ${imported.length} carte. Vuoi sostituire le tue carte attuali o aggiungerle? (OK: Sostituisci, Annulla: Aggiungi)`)) {
          cards = imported
        } else {
          cards = [...cards, ...imported]
        }
        saveToStorage()
        alert('Importazione completata con successo!')
        closeSettingsModalFn()
      } else {
        alert('Formato file non valido.')
      }
    } catch (err) {
      alert('Errore durante la lettura del file.')
    }
  }
  reader.readAsText(file)
}

// --- Scanner Logic ---
const startScanner = async () => {
  const formats = [
    Html5QrcodeSupportedFormats.EAN_13,
    Html5QrcodeSupportedFormats.EAN_8,
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.QR_CODE,
    Html5QrcodeSupportedFormats.UPC_A,
    Html5QrcodeSupportedFormats.UPC_E,
    Html5QrcodeSupportedFormats.CODE_39
  ]

  currentScanner = new Html5Qrcode("reader")

  try {
    await currentScanner.start(
      { facingMode: "environment" },
      {
        fps: 15,
        qrbox: { width: 280, height: 160 }
      },
      (decodedText) => {
        barcodeValueInput.value = decodedText
        currentScanner.stop().then(() => {
          currentScanner = null
          // Visual feedback
          startScanBtn.classList.add('btn-success')
          setTimeout(() => startScanBtn.classList.remove('btn-success'), 2000)
        })
      },
      (errorMessage) => {
        // quiet
      }
    )
  } catch (err) {
    console.error("Errore fotocamera", err)
    alert("Impossibile accedere alla fotocamera. Verifica i permessi.")
  }
}

// --- Event Listeners ---
addCardBtn.onclick = openAddModal
closeAddModal.onclick = closeAddModalFn
closeViewModal.onclick = closeViewModalFn
closeViewBtn.onclick = closeViewModalFn
settingsBtn.onclick = openSettingsModal
closeSettingsModal.onclick = closeSettingsModalFn
exportBtn.onclick = exportCards
importFile.onchange = importCards
saveCardBtn.onclick = () => {
  const name = storeNameInput.value.trim()
  const code = barcodeValueInput.value.trim()

  if (!name || !code) {
    alert('Inserisci nome negozio e codice')
    return
  }

  const newCard = {
    id: generateId(),
    name,
    code,
    usageCount: 0,
    locations: []
  }

  cards.push(newCard)
  saveToStorage()
  closeAddModalFn()
}

deleteCardBtn.onclick = () => {
  if (confirm('Sei sicuro di voler eliminare questa carta?')) {
    cards = cards.filter(c => c.id !== currentCardId)
    saveToStorage()
    closeViewModalFn()
  }
}

startScanBtn.onclick = (e) => {
  e.preventDefault()
  if (currentScanner) {
    currentScanner.stop().then(() => {
      currentScanner = null
      startScanner() // restart to be sure
    })
  } else {
    startScanner()
  }
}




// Initial Render
renderCards()
updateLocation() // Request location on start
createIcons({
  icons: {
    Plus, X, Camera, Trash2, Smartphone, Settings, Download, Upload
  }
})
