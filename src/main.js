import './style.css'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import bwipjs from 'bwip-js'
import { createIcons, Plus, X, Camera, Trash2, Smartphone, Settings, Download, Upload, Search, Share2 } from 'lucide'

// --- i18n System ---
import { translations } from './translations.js'

let currentLang = localStorage.getItem('app_lang') ||
  (navigator.language.startsWith('it') ? 'it' :
    translations[navigator.language.split('-')[0]] ? navigator.language.split('-')[0] : 'en')

let searchQuery = ''

const t = (key, params = {}) => {
  let str = (translations[currentLang] && translations[currentLang][key]) || translations['en'][key] || key
  for (const [pKey, pVal] of Object.entries(params)) {
    str = str.replace(`{${pKey}}`, pVal)
  }
  return str
}

const updateUI = () => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    el.textContent = t(key)
  })

  // Update placeholders
  const storeNameInput = document.getElementById('storeName')
  const barcodeValueInput = document.getElementById('barcodeValue')
  const searchInput = document.getElementById('searchInput')

  if (storeNameInput) storeNameInput.placeholder = t('store_name_placeholder')
  if (barcodeValueInput) barcodeValueInput.placeholder = t('barcode_placeholder')
  if (searchInput) searchInput.placeholder = t('search_placeholder')

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria')
    el.setAttribute('aria-label', t(key))
  })

  // Set select value
  document.getElementById('languageSelect').value = currentLang
}

// --- State Management ---
let cards = JSON.parse(localStorage.getItem('loyalty_cards') || '[]')
let currentScanner = null
let currentCardId = null
let currentCard = null
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
const languageSelect = document.getElementById('languageSelect')
const shareModal = document.getElementById('shareModal')
const closeShareModal = document.getElementById('closeShareModal')
const closeShareBtn = document.getElementById('closeShareBtn')
const shareQRContainer = document.getElementById('shareQRContainer')
const shareCardBtn = document.getElementById('shareCardBtn')
const searchInput = document.getElementById('searchInput')

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
    const alreadySaved = (card.locations || []).some(loc =>
      getDistance(coords.lat, coords.lon, loc.lat, loc.lon) < 300
    )
    if (alreadySaved) return

    const query = encodeURIComponent(card.name)
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&lat=${coords.lat}&lon=${coords.lon}&limit=5`

    const response = await fetch(url, {
      headers: { 'User-Agent': 'DigiShoppingCard-PWA-App' }
    })
    const data = await response.json()

    const isValidLocation = data.some(result => {
      const dist = getDistance(coords.lat, coords.lon, parseFloat(result.lat), parseFloat(result.lon))
      return dist < NEARBY_THRESHOLD
    })

    if (isValidLocation) {
      if (!card.locations) card.locations = []
      card.locations.push({ lat: coords.lat, lon: coords.lon, timestamp: Date.now() })
      saveToStorage()
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
    barcodeCanvasContainer.innerHTML = `<p style="color:red">${t('barcode_error')}</p>`
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

  const filteredCards = cards.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.category && t(`cat_${c.category}`).toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (filteredCards.length === 0) {
    emptyState.style.display = 'flex'
    emptyState.style.flexDirection = 'column'
    emptyState.style.alignItems = 'center'
    emptyState.innerHTML = `
      <div class="empty-state-icon">🪪</div>
      <p>${t('no_cards')}</p>
      <p>${t('start_tip')}</p>
    `
  } else {
    emptyState.style.display = 'none'
    const sortedCards = [...filteredCards].sort((a, b) => {
      let scoreA = a.usageCount || 0
      let scoreB = b.usageCount || 0

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

      if (card.category && card.category !== 'other') {
        const catBadge = document.createElement('div')
        catBadge.className = 'card-category-badge'
        catBadge.textContent = t(`cat_${card.category}`)
        cardEl.appendChild(catBadge)
      }

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
  storeNameInput.value = ''
  barcodeValueInput.value = ''
  cardCategorySelect.value = 'other'
  document.getElementById('reader').innerHTML = ''
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
  currentCard = card
  viewStoreName.textContent = card.name
  viewBarcodeValue.textContent = card.code
  viewModal.classList.add('active')

  card.usageCount = (card.usageCount || 0) + 1
  saveToStorage()

  if (userCoords) {
    verifyAndRecordLocation(card, userCoords)
  }

  setTimeout(() => {
    renderBarcode(card.code)
  }, 100)
}

const closeViewModalFn = () => {
  viewModal.classList.remove('active')
  currentCard = null
}

const openShareModal = () => {
  if (!currentCard) return
  shareModal.classList.add('active')

  const shareData = {
    type: 'card_share',
    name: currentCard.name,
    code: currentCard.code,
    category: currentCard.category || 'other'
  }

  shareQRContainer.innerHTML = '<canvas id="shareQR"></canvas>'
  try {
    bwipjs.toCanvas('shareQR', {
      bcid: 'qrcode',
      text: JSON.stringify(shareData),
      scale: 8,
      height: 20,
      width: 20,
      includetext: false,
      textxalign: 'center',
    })
  } catch (e) {
    console.error(e)
  }
}

const closeShareModalFn = () => {
  shareModal.classList.remove('active')
}

const openSettingsModal = () => {
  settingsModal.classList.add('active')
}

const closeSettingsModalFn = () => {
  settingsModal.classList.remove('active')
}

// --- Crypto Utilities ---
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
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256' },
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
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, enc.encode(JSON.stringify(data)))

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

    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, ciphertext)
    const dec = new TextDecoder()
    return JSON.parse(dec.decode(decrypted))
  } catch (e) {
    throw new Error(t('wrong_password'))
  }
}

const exportCards = async () => {
  const password = prompt(t('password_prompt'))

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

      if (imported.version === 'encrypted-v1') {
        const password = prompt(t('encrypted_prompt'))
        if (!password) return
        try {
          imported = await decryptData(imported, password)
        } catch (err) {
          alert(err.message)
          return
        }
      }

      if (Array.isArray(imported)) {
        if (confirm(t('import_confirm', { n: imported.length }))) {
          cards = imported
        } else {
          cards = [...cards, ...imported]
        }
        saveToStorage()
        alert(t('import_success'))
        closeSettingsModalFn()
      } else {
        alert(t('invalid_format'))
      }
    } catch (err) {
      alert(t('read_error'))
    }
  }
  reader.readAsText(file)
}

// --- Scanner Logic ---
const startScanner = async () => {
  currentScanner = new Html5Qrcode("reader")
  try {
    await currentScanner.start(
      { facingMode: "environment" },
      { fps: 15, qrbox: { width: 280, height: 160 } },
      (decodedText) => {
        // Recognition of shared cards
        if (decodedText.startsWith('{"type":"card_share"')) {
          try {
            const data = JSON.parse(decodedText)
            if (confirm(t('share_confirm', { name: data.name }))) {
              const newCard = {
                id: generateId(),
                name: data.name,
                code: data.code,
                category: data.category,
                usageCount: 0,
                locations: []
              }
              cards.push(newCard)
              saveToStorage()
              currentScanner.stop().then(() => {
                currentScanner = null
                closeAddModalFn()
              })
              return
            }
          } catch (e) { }
        }

        barcodeValueInput.value = decodedText
        currentScanner.stop().then(() => {
          currentScanner = null
          startScanBtn.classList.add('btn-success')
          setTimeout(() => startScanBtn.classList.remove('btn-success'), 2000)
        })
      },
      () => { }
    )
  } catch (err) {
    alert(t('camera_error'))
  }
}

// --- Event Listeners ---
addCardBtn.onclick = openAddModal
closeAddModal.onclick = closeAddModalFn
closeViewModal.onclick = closeViewModalFn
closeViewBtn.onclick = closeViewModalFn
settingsBtn.onclick = openSettingsModal
closeSettingsModal.onclick = closeSettingsModalFn
shareCardBtn.onclick = openShareModal
closeShareModal.onclick = closeShareModalFn
closeShareBtn.onclick = closeShareModalFn
exportBtn.onclick = exportCards
importFile.onchange = importCards

languageSelect.onchange = (e) => {
  currentLang = e.target.value
  localStorage.setItem('app_lang', currentLang)
  updateUI()
  renderCards()
}

saveCardBtn.onclick = () => {
  const name = storeNameInput.value.trim()
  const code = barcodeValueInput.value.trim()
  const category = cardCategorySelect.value

  if (!name || !code) {
    alert(t('fill_fields'))
    return
  }

  const newCard = { id: generateId(), name, code, category, usageCount: 0, locations: [] }
  cards.push(newCard)
  saveToStorage()
  closeAddModalFn()
}

deleteCardBtn.onclick = () => {
  if (confirm(t('confirm_delete'))) {
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
      startScanner()
    })
  } else {
    startScanner()
  }
}

searchInput.oninput = (e) => {
  searchQuery = e.target.value
  renderCards()
}

// Initial Render
updateUI()
renderCards()
updateLocation()
createIcons({
  icons: { Plus, X, Camera, Trash2, Smartphone, Settings, Download, Upload, Search, Share2 }
})
