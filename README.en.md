# DigiShoppingCard PWA 🪪

A modern, fast, and secure Progressive Web App (PWA) to digitize your loyalty cards.

## ✨ Features
- **Quick Scan**: Add cards by scanning barcodes with your camera.
- **Quick Search**: Instantly find your card by typing the store name in the search bar.
- **Categories**: Organize your collection by grouping cards into Groceries, Fashion, Tech, Health, and more.
- **QR Sharing (QR Transfer)**: Instantly share your cards with family and friends by generating a QR code that can be scanned directly from another user's app.
- **Smart Geolocation**: The app learns where you use your cards and pushes them to the top when you are near the store.
- **Premium Design**: Optimized mobile interface with dark mode, smooth animations, and crisp icons.
- **Offline Functionality**: Works without an internet connection once installed on your device.

## 🔒 Security & Privacy (GDPR Compliant)
The application is designed following the **Privacy by Design** principle:

- **Local-First**: All card data is saved exclusively in your browser's `localStorage`. No data is ever sent to central servers.
- **Encrypted Backup**: Exported backups can be protected with **AES-256-GCM** encryption. Data remains in plain text only on your device; if protected with a password, it travels encrypted across the internet (e.g., to iCloud or Google Drive).
- **XSS Protection**: Data rendering uses secure methods (`textContent`) to prevent script injection attacks.
- **Transparency**: Geolocation uses OpenStreetMap for store verification. No user-identifying data is sent to third parties.
- **GDPR Ready**: No profiling, no registration required. The user has full control (right to be forgotten and data portability) over their information.

## 🚀 Tech Stack
- **Vanilla JavaScript**: Zero heavy frameworks for maximum performance.
- **Vite**: For a fast and optimized build.
- **Lucide Icons**: Elegant and sharp vector icons.
- **BWIP-JS**: High-precision barcode generation (EAN-13, CODE-128, etc.).
- **HTML5-QRCode**: Robust and reliable scanning engine.
- **GitHub Pages**: Secure and resilient static hosting.

## 🛠️ Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Generate production build
npm run build
```

## 📱 Installation
Open [https://skinny1973.github.io/digishoppingcard/](https://skinny1973.github.io/digishoppingcard/) on your smartphone and use the "Add to Home Screen" function of your browser.
