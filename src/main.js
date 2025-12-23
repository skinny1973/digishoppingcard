import './style.css'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import bwipjs from 'bwip-js'
import { createIcons, Plus, X, Camera, Image as ImageIcon, Trash2, Smartphone, Settings, Download, Upload } from 'lucide'

// --- State Management ---
let cards = JSON.parse(localStorage.getItem('loyalty_cards') || '[]')
let currentScanner = null
let currentCardId = null

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
const logoUpload = document.getElementById('logoUpload')
const logoImg = document.getElementById('logoImg')
const logoPlaceholder = document.getElementById('logoPlaceholder')
const imageUpload = document.getElementById('imageUpload')

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

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
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
      const usageA = a.usageCount || 0
      const usageB = b.usageCount || 0
      if (usageB !== usageA) return usageB - usageA
      return a.name.localeCompare(b.name)
    })

    sortedCards.forEach((card, index) => {
      const cardEl = document.createElement('div')
      cardEl.className = 'loyalty-card'
      cardEl.onclick = () => openViewModal(card)

      if (!card.logo) {
        cardEl.style.background = colors[index % colors.length]
      }

      const logoHtml = card.logo
        ? `<img src="${card.logo}" class="card-logo">`
        : `<div class="card-logo" style="background: rgba(255,255,255,0.2)">${card.name[0]?.toUpperCase() || 'C'}</div>`

      cardEl.innerHTML = `
        ${logoHtml}
        <div class="card-name">${card.name}</div>
      `
      cardGrid.appendChild(cardEl)
    })
  }
}

const openAddModal = () => {
  addModal.classList.add('active')
  // Reset form
  storeNameInput.value = ''
  barcodeValueInput.value = ''
  logoImg.src = ''
  logoImg.style.display = 'none'
  logoPlaceholder.style.display = 'flex'
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
  saveToStorage() // This will also trigger re-render in the background with new order next time it opens or after closing if we want, but here it saves the state.

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

// --- Backup & Restore Logic ---
const exportCards = () => {
  const dataStr = JSON.stringify(cards, null, 2)
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
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result)
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
    logo: logoImg.style.display !== 'none' ? logoImg.src : null,
    usageCount: 0
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

logoUpload.onchange = async (e) => {
  if (e.target.files && e.target.files[0]) {
    const base64 = await fileToBase64(e.target.files[0])
    logoImg.src = base64
    logoImg.style.display = 'block'
    logoPlaceholder.style.display = 'none'
  }
}

imageUpload.onchange = async (e) => {
  if (e.target.files && e.target.files[0]) {
    const scanner = new Html5Qrcode("reader")
    try {
      const result = await scanner.scanFile(e.target.files[0], true)
      barcodeValueInput.value = result
      alert('Codice rilevato: ' + result)
    } catch (err) {
      alert('Nessun codice trovato nell\'immagine. Prova a scattare una foto più nitida.')
    }
  }
}

// Initial Render
renderCards()
createIcons({
  icons: {
    Plus, X, Camera, ImageIcon, Trash2, Smartphone, Settings, Download, Upload
  }
})
