# DigiShoppingCard PWA 🪪

Aplikasi Web Progresif (PWA) modern, cepat, dan aman untuk mendigitalkan kartu loyalitas Anda.

## ✨ Fitur
- **Pindai Cepat**: Tambahkan kartu dengan memindai barcode menggunakan kamera Anda.
- **Geolokasi Cerdas**: Aplikasi mempelajari di mana Anda menggunakan kartu dan mendorongnya ke bagian atas daftar saat Anda berada di dekat toko.
- **Desain Premium**: Antarmuka seluler yang dioptimalkan dengan mode gelap, animasi halus, dan ikon tajam.
- **Fungsi Offline**: Bekerja tanpa koneksi internet setelah diinstal pada perangkat Anda.

## 🔒 Keamanan & Privasi (Sesuai GDPR)
Aplikasi ini dirancang mengikuti prinsip **Privasi Berdasarkan Desain**:

- **Lokal Utama**: Semua data kartu disimpan secara eksklusif di `localStorage` browser Anda. Tidak ada data yang dikirim ke server pusat.
- **Cadangan Terenkripsi**: Cadangan yang diekspor dapat dilindungi dengan enkripsi **AES-256-GCM**. Data tetap dalam teks biasa hanya di perangkat Anda; jika dilindungi dengan kata sandi, data tersebut dikirim terenkripsi melalui internet (misalnya, ke iCloud atau Google Drive).
- **Perlindungan XSS**: Rendering data menggunakan metode aman (`textContent`) untuk mencegah serangan injeksi skrip.
- **Transparansi**: Geolokasi menggunakan OpenStreetMap untuk verifikasi toko terdekat. Tidak ada data identitas pengguna yang dikirim ke pihak ketiga.
- **Siap GDPR**: Tidak ada pemrolehan profil, tidak perlu registrasi. Pengguna memiliki kendali penuh (hak untuk dilupakan dan portabilitas data) atas informasi mereka.

## 🚀 Tumpukan Teknologi
- **Vanilla JavaScript**: Tanpa framework berat untuk performa maksimal.
- **Vite**: Untuk build yang cepat dan optimal.
- **Ikon Lucide**: Ikon vektor yang elegan dan tajam.
- **BWIP-JS**: Pembuatan barcode presisi tinggi.
- **HTML5-QRCode**: Mesin pemindaian yang kuat dan andal.
- **GitHub Pages**: Hosting statis yang aman dan tangguh.

## 📱 Instalasi
Buka [https://skinny1973.github.io/digishoppingcard/](https://skinny1973.github.io/digishoppingcard/) di smartphone Anda dan gunakan fungsi "Tambahkan ke Layar Utama" di browser Anda.
