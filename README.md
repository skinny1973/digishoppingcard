# DigiShoppingCard PWA 🪪

Una Progressive Web App (PWA) moderna, veloce e sicura per digitalizzare le tue carte fedeltà.

## ✨ Caratteristiche
- **Scansione Rapida**: Aggiungi carte scansionando il codice a barre con la fotocamera.
- **Ricerca Rapida**: Trova subito la tua carta digitando il nome del negozio nella barra di ricerca.
- **Categorie**: Organizza la tua collezione suddividendo le carte per Spesa, Moda, Tecnologia, Salute e altro.
- **Condivisione QR (QR Transfer)**: Condividi istantaneamente le tue carte con familiari e amici generando un codice QR che può essere scansionato direttamente dall'app di un altro utente.
- **Geolocalizzazione Intelligente**: L'app impara dove usi le tue carte e te le mostra in cima alla lista quando sei vicino al negozio.
- **Design Premium**: Interfaccia ottimizzata per smartphone con dark mode, animazioni fluide e icone nitide.
- **Funzionamento Offline**: Essendo una PWA, funziona anche senza connessione internet una volta installata.

## 🔒 Sicurezza e Privacy (GDPR Compliant)
L'applicazione è stata progettata seguendo il principio della **Privacy by Design**:

- **Local-First**: Tutti i dati delle tue carte sono salvati esclusivamente nel `localStorage` del tuo browser. Nessun dato viene mai inviato a server centrali.
- **Backup Cifrato**: I backup esportati possono essere protetti con cifratura **AES-256-GCM**. I dati sono in chiaro solo sul tuo dispositivo; se scegli di proteggerli con password, viaggeranno cifrati su internet (es. verso iCloud o Google Drive).
- **Protezione XSS**: Il rendering dei dati utilizza metodi sicuri (`textContent`) per prevenire attacchi di iniezione di codice.
- **Trasparenza**: La geolocalizzazione utilizza OpenStreetMap per la verifica dei negozi. Non vengono inviati dati identificativi dell'utente a terze parti.
- **GDPR Ready**: L'app non effettua profilazione, non richiede registrazione e garantisce all'utente il pieno controllo (diritto all'oblio e portabilità) dei propri dati.

## 🚀 Tecnologie utilizzate
- **Vanilla JavaScript**: Zero framework pesanti per la massima velocità.
- **Vite**: Per un build veloce e ottimizzato.
- **Lucide Icons**: Icone vettoriali eleganti e nitide.
- **BWIP-JS**: Generazione di codici a barre ad alta precisione (EAN-13, CODE-128, etc.).
- **HTML5-QRCode**: Motore di scansione robusto e affidabile.
- **GitHub Pages**: Hosting statico sicuro e resiliente.

## 🛠️ Sviluppo Locale
```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Genera la build di produzione
npm run build
```

## 📱 Installazione
Apri [https://skinny1973.github.io/digishoppingcard/](https://skinny1973.github.io/digishoppingcard/) sul tuo smartphone e usa la funzione "Aggiungi alla schermata Home" del tuo browser.

## 📄 Licenza
Il codice di DigiShoppingCard è rilasciato sotto licenza **GNU General Public License v3.0**. Consulta il file [LICENSE](./LICENSE) per i dettagli.

