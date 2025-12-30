# DigiShoppingCard PWA 🪪

Eine moderne, schnelle und sichere Progressive Web App (PWA) zur Digitalisierung Ihrer Kundenkarten.

## ✨ Funktionen
- **Schnell-Scan**: Fügen Sie Karten hinzu, indem Sie Barcodes mit Ihrer Kamera scannen.
- **Schnellsuche**: Finden Sie Ihre Karte sofort, indem Sie den Geschäftsnamen in die Suchleiste eingeben.
- **Kategorien**: Organisieren Sie Ihre Sammlung nach Lebensmitteln, Mode, Technik, Gesundheit und mehr.
- **QR-Teilen (QR Transfer)**: Teilen Sie Ihre Karten sofort mit Familie und Freunden, indem Sie einen QR-Code generieren, der direkt aus der App eines anderen Nutzers gescannt werden kann.
- **Intelligente Geolokalisierung**: Die App lernt, wo Sie Ihre Karten verwenden, und schiebt diese an die Spitze der Liste, wenn Sie sich in der Nähe des Geschäfts befinden.
- **Premium-Design**: Optimierte mobile Benutzeroberfläche mit Dark Mode, flüssigen Animationen und scharfen Symbolen.
- **Offline-Funktionalität**: Funktioniert nach der Installation auf Ihrem Gerät auch ohne Internetverbindung.

## 🔒 Sicherheit & Datenschutz (DSGVO-konform)
Die Anwendung wurde nach dem Prinzip **Privacy by Design** entwickelt:

- **Local-First**: Alle Kartendaten werden ausschließlich im `localStorage` Ihres Browsers gespeichert. Es werden keine Daten an zentrale Server gesendet.
- **Verschlüsseltes Backup**: Exportierte Sicherungen können mit einer **AES-256-GCM** Verschlüsselung geschützt werden. Die Daten liegen nur auf Ihrem Gerät im Klartext vor; wenn sie mit einem Passwort geschützt sind, werden sie verschlüsselt über das Internet übertragen (z. B. zu iCloud oder Google Drive).
- **XSS-Schutz**: Die Datenausgabe erfolgt über sichere Methoden (`textContent`), um Script-Injection-Angriffe zu verhindern.
- **Transparenz**: Die Geolokalisierung nutzt OpenStreetMap zur Überprüfung von Geschäften in der Nähe. Es werden keine benutzeridentifizierenden Daten an Dritte gesendet.
- **DSGVO-bereit**: Kein Profiling, keine Registrierung erforderlich. Der Nutzer hat die volle Kontrolle (Recht auf Vergessenwerden und Datenübertragbarkeit) über seine Informationen.

## 🚀 Technologien
- **Vanilla JavaScript**: Keine schweren Frameworks für maximale Performance.
- **Vite**: Für einen schnellen und optimierten Build.
- **Lucide Icons**: Elegante und scharfe Vektorsymbole.
- **BWIP-JS**: Hochpräzise Barcode-Generierung.
- **HTML5-QRCode**: Robuste und zuverlässige Scan-Engine.
- **GitHub Pages**: Sicheres und belastbares statisches Hosting.

## 📱 Installation
Öffnen Sie [https://skinny1973.github.io/digishoppingcard/](https://skinny1973.github.io/digishoppingcard/) auf Ihrem Smartphone und nutzen Sie die Funktion "Zum Home-Bildschirm hinzufügen" Ihres Browsers.
