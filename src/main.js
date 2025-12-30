// --- i18n System ---
const translations = {
  it: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'Le mie carte',
    aria_add_card: 'Aggiungi Carta',
    aria_select_language: 'Seleziona Lingua',
    new_card_title: 'Nuova Carta',
    scan_btn: 'Scansiona Barcode',
    store_name_label: 'Nome Negozio',
    store_name_placeholder: 'Es. Esselunga, Carrefour...',
    barcode_label: 'Codice Barcode',
    barcode_placeholder: 'Inserisci il codice manualmente',
    save_btn: 'Salva Carta',
    close_btn: 'Chiudi',
    delete_btn: 'Elimina Carta',
    settings_title: 'Impostazioni',
    settings_desc: 'Gestisci i tuoi dati in locale o esportali per sicurezza.',
    language_section: 'Lingua',
    backup_section: 'Backup e Ripristino',
    backup_desc: 'Esporta i tuoi dati su iCloud o Google Drive salvando il file sul dispositivo. Puoi ripristinarli caricando lo stesso file.',
    export_btn: 'Esporta Backup (.json)',
    import_btn: 'Importa Backup (.json)',
    storage_info: 'Tutti i dati sono salvati solo sul tuo dispositivo.',
    privacy_note: 'La funzione di geolocalizzazione utilizza OpenStreetMap per verificare i negozi nelle vicinanze. Nessun dato identificativo viene inviato.',
    no_cards: 'Non hai ancora aggiunto nessuna carta.',
    start_tip: 'Tocca il tasto + per iniziare!',
    barcode_error: 'Errore generazione barcode. Assicurati che il codice sia valido.',
    confirm_delete: 'Sei sicuro di voler eliminare questa carta?',
    fill_fields: 'Inserisci nome negozio e codice',
    camera_error: 'Impossibile accedere alla fotocamera. Verifica i permessi.',
    import_confirm: 'Hai caricato {n} carte. Vuoi sostituire le tue carte attuali o aggiungerle? (OK: Sostituisci, Annulla: Aggiungi)',
    import_success: 'Importazione completata con successo!',
    invalid_format: 'Formato file non valido.',
    read_error: 'Errore durante la lettura del file.',
    password_prompt: 'Inserisci una password per proteggere il tuo backup (lascia vuoto per non cifrare):',
    encrypted_prompt: 'Questo backup è cifrato. Inserisci la password:',
    wrong_password: 'Password errata o file corrotto.'
  },
  en: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'My Cards',
    aria_add_card: 'Add Card',
    aria_select_language: 'Select Language',
    new_card_title: 'New Card',
    scan_btn: 'Scan Barcode',
    store_name_label: 'Store Name',
    store_name_placeholder: 'e.g. Walmart, Tesco...',
    barcode_label: 'Barcode Value',
    barcode_placeholder: 'Enter code manually',
    save_btn: 'Save Card',
    close_btn: 'Close',
    delete_btn: 'Delete Card',
    settings_title: 'Settings',
    settings_desc: 'Manage your local data or export it for backup.',
    language_section: 'Language',
    backup_section: 'Backup & Restore',
    backup_desc: 'Export your data to iCloud or Google Drive. You can restore it by uploading the same file.',
    export_btn: 'Export Backup (.json)',
    import_btn: 'Import Backup (.json)',
    storage_info: 'All data is saved only on your device.',
    privacy_note: 'The geolocation feature uses OpenStreetMap to verify nearby stores. No identifying data is sent.',
    no_cards: 'You haven\'t added any cards yet.',
    start_tip: 'Tap the + button to start!',
    barcode_error: 'Barcode generation error. Please ensure the code is valid.',
    confirm_delete: 'Are you sure you want to delete this card?',
    fill_fields: 'Please enter store name and code',
    camera_error: 'Unable to access camera. Please check permissions.',
    import_confirm: 'You loaded {n} cards. Do you want to replace your current cards or add them? (OK: Replace, Cancel: Add)',
    import_success: 'Import completed successfully!',
    invalid_format: 'Invalid file format.',
    read_error: 'Error reading the file.',
    password_prompt: 'Enter a password to protect your backup (leave empty for no encryption):',
    encrypted_prompt: 'This backup is encrypted. Enter the password:',
    wrong_password: 'Wrong password or corrupted file.'
  },
  es: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'Mis Tarjetas',
    aria_add_card: 'Añadir Tarjeta',
    aria_select_language: 'Seleccionar Idioma',
    new_card_title: 'Nueva Tarjeta',
    scan_btn: 'Escanear Código',
    store_name_label: 'Nombre de la Tienda',
    store_name_placeholder: 'Ejem: Carrefour, Zara...',
    barcode_label: 'Código de Barras',
    barcode_placeholder: 'Introducir código manualmente',
    save_btn: 'Guardar Tarjeta',
    close_btn: 'Cerrar',
    delete_btn: 'Eliminar Tarjeta',
    settings_title: 'Ajustes',
    settings_desc: 'Gestiona tus datos locales o expórtalos.',
    language_section: 'Idioma',
    backup_section: 'Copia de Seguridad',
    backup_desc: 'Exporta tus datos a la nube. Puedes restaurarlos subiendo el mismo archivo.',
    export_btn: 'Exportar Copia (.json)',
    import_btn: 'Importar Copia (.json)',
    storage_info: 'Todos los datos se guardan solo en tu dispositivo.',
    privacy_note: 'La geolocalización utiliza OpenStreetMap. No si envían datos identificativi.',
    no_cards: 'Aún no has añadido ninguna tarjeta.',
    start_tip: '¡Toca el botón + para empezar!',
    barcode_error: 'Error al generar el código. Verifica que sea válido.',
    confirm_delete: '¿Estás seguro de que vuoi eliminar esta tarjeta?',
    fill_fields: 'Introduce el nombre de la tienda y el código',
    camera_error: 'No se può acceder a la cámara. Revisa los permisos.',
    import_confirm: 'Has cargado {n} tarjetas. ¿Quieres reemplazar las actuales o añadirlas? (OK: Reemplazar, Cancelar: Añadir)',
    import_success: '¡Importación completada!',
    invalid_format: 'Formato de archivo no válido.',
    read_error: 'Error al leer el archivo.',
    password_prompt: 'Introduce una contraseña para cifrar el archivo (deja vacío para no cifrar):',
    encrypted_prompt: 'Esta copia está cifrada. Introduce la contraseña:',
    wrong_password: 'Contraseña incorrecta o archivo dañado.'
  },
  fr: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'Mes Cartes',
    aria_add_card: 'Ajouter une Carte',
    aria_select_language: 'Choisir la Langue',
    new_card_title: 'Nouvelle Carte',
    scan_btn: 'Scanner le Code',
    store_name_label: 'Nom du Magasin',
    store_name_placeholder: 'Ex: Auchan, Decathlon...',
    barcode_label: 'Code-barres',
    barcode_placeholder: 'Saisir le code manuellement',
    save_btn: 'Enregistrer',
    close_btn: 'Fermer',
    delete_btn: 'Supprimer la Carte',
    settings_title: 'Paramètres',
    settings_desc: 'Gérez vos données locales ou exportez-les.',
    language_section: 'Langue',
    backup_section: 'Sauvegarde et Restauration',
    backup_desc: 'Exportez vos données vers le cloud. Vous pouvez le restaurer en téléchargeant le même fichier.',
    export_btn: 'Exporter (.json)',
    import_btn: 'Importer (.json)',
    storage_info: 'Toutes le données sont stockées uniquement sur votre appareil.',
    privacy_note: 'La géolocalisation utilise OpenStreetMap. Aucune donnée d\'identification n\'est envoyée.',
    no_cards: 'Vous n\'avez pas ancora ajouté de carte.',
    start_tip: 'Appuyez sur le bouton + pour commencer!',
    barcode_error: 'Erreur de génération du code. Vérifiez la validité.',
    confirm_delete: 'Voulez-vous vraiment supprimer cette carte?',
    fill_fields: 'Veuillez saisir le nom du magasin et le code',
    camera_error: 'Impossible d\'accéder à la caméra. Vérifiez les autorisations.',
    import_confirm: 'Vous avez chargé {n} cartes. Voulez-vous remplacer les cartes actuelles o les ajouter? (OK: Remplacer, Annuler: Ajouter)',
    import_success: 'Importation réussie!',
    invalid_format: 'Format de fichier non valide.',
    read_error: 'Erreur lors de la lecture du fichier.',
    password_prompt: 'Entrez un mot de passe pour chiffrer (laissez vide pour ne pas chiffrer):',
    encrypted_prompt: 'Cette sauvegarde est chiffrée. Entrez le mot de passe:',
    wrong_password: 'Mot de passe incorrect ou fichier corrompu.'
  },
  de: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'Meine Karten',
    aria_add_card: 'Karte hinzufügen',
    aria_select_language: 'Sprache auswählen',
    new_card_title: 'Neue Karte',
    scan_btn: 'Barcode scannen',
    store_name_label: 'Geschäftsname',
    store_name_placeholder: 'z.B. Lidl, Aldi...',
    barcode_label: 'Barcode-Nummer',
    barcode_placeholder: 'Code manuell eingeben',
    save_btn: 'Karte speichern',
    close_btn: 'Schließen',
    delete_btn: 'Karte löschen',
    settings_title: 'Einstellungen',
    settings_desc: 'Verwalten oder exportieren Sie Ihre lokalen Daten.',
    language_section: 'Sprache',
    backup_section: 'Sicherung & Wiederherstellung',
    backup_desc: 'Exportieren Sie Ihre Daten in die Cloud. Sie können sie durch Hochladen derselben Datei wiederherstellen.',
    export_btn: 'Backup exportieren (.json)',
    import_btn: 'Backup importieren (.json)',
    storage_info: 'Alle Daten werden nur auf Ihrem Gerät gespeichert.',
    privacy_note: 'Geolokalisierung nutzt OpenStreetMap. Es werden keine Identifikationsdaten gesendet.',
    no_cards: 'Sie haben noch keine Karten hinzugefügt.',
    start_tip: 'Tippen Sie auf das + Symbol, um zu beginnen!',
    barcode_error: 'Fehler bei der Barcode-Erstellung. Code prüfen.',
    confirm_delete: 'Sind Sie sicher, dass Sie diese Karte löschen möchten?',
    fill_fields: 'Bitte Geschäftsname und Code eingeben',
    camera_error: 'Kamerazugriff fehlgeschlagen. Berechtigungen prüfen.',
    import_confirm: 'Sie haben {n} Karten geladen. Aktuelle ersetzen oder hinzufügen? (OK: Ersetzen, Abbrechen: Hinzufügen)',
    import_success: 'Import erfolgreich abgeschlossen!',
    invalid_format: 'Ungültiges Dateiformat.',
    read_error: 'Fehler beim Lesen der Datei.',
    password_prompt: 'Passwort zum Verschlüsseln eingeben (leer lassen für keine Verschlüsselung):',
    encrypted_prompt: 'Backup ist verschlüsselt. Passwort eingeben:',
    wrong_password: 'Falsches Passwort oder beschädigte Datei.'
  }
}

let currentLang = localStorage.getItem('app_lang') ||
  (navigator.language.startsWith('it') ? 'it' :
    translations[navigator.language.split('-')[0]] ? navigator.language.split('-')[0] : 'en')

const t = (key, params = {}) => {
  let str = translations[currentLang][key] || translations['en'][key] || key
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
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder')
    el.placeholder = t(key)
  })
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
  if (cards.length === 0) {
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
    const sortedCards = [...cards].sort((a, b) => {
      let scoreA = a.usageCount || 0
      let scoreB = b.usageCount || 0

      if (userCoords) {
        const isANearby = (a.locations || []).some(loc =>
          getDistance(userCoords.lat, userCoords.lon, loc.lat, loc.lon) < NEARBY_THRESHOLD
        )
        const isBNearby = (b.locations || []).some(loc =>
          getDistance(userCoords.lat, userCoords.lon, loc.lat, lon.lon) < NEARBY_THRESHOLD
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
  storeNameInput.value = ''
  barcodeValueInput.value = ''
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

  if (!name || !code) {
    alert(t('fill_fields'))
    return
  }

  const newCard = { id: generateId(), name, code, usageCount: 0, locations: [] }
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

// Initial Render
updateUI()
renderCards()
updateLocation()
createIcons({
  icons: { Plus, X, Camera, Trash2, Smartphone, Settings, Download, Upload }
})

