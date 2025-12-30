# DigiShoppingCard PWA 🪪

Una aplicación web progresiva (PWA) moderna, rápida y segura para digitalizar tus tarjetas de fidelidad.

## ✨ Características
- **Escaneo Rápido**: Añade tarjetas escaneando el código de barras con tu cámara.
- **Búsqueda Rápida**: Encuentra tu tarjeta al instante escribiendo el nombre de la tienda en la barra de búsqueda.
- **Categorías**: Organiza tu colección agrupando tarjetas en Supermercado, Moda, Tecnología, Salud y más.
- **Compartir QR (QR Transfer)**: Comparte tus tarjetas al instante con familiares y amigos generando un código QR que se puede escanear directamente desde la aplicación de otro usuario.
- **Geolocalización Inteligente**: La aplicación aprende dónde usas tus tarjetas y las muestra al principio de la lista cuando estás cerca de la tienda.
- **Diseño Premium**: Interfaz móvil optimizada con modo oscuro, animaciones fluidas e iconos nítidos.
- **Funcionalidad Offline**: Funciona sin conexión a internet una vez instalada en tu dispositivo.

## 🔒 Seguridad y Privacidad (Cumple con el RGPD)
La aplicación ha sido diseñada siguiendo el principio de **Privacidad desde el Diseño**:

- **Local-First**: Todos los datos de tus tarjetas se guardan exclusivamente en el `localStorage` de tu navegador. Ningún dato se envía a servidores centrales.
- **Copia de Seguridad Cifrada**: Las copias exportadas pueden protegerse con cifrado **AES-256-GCM**. Los datos solo están en claro en tu dispositivo; si eliges protegerlos con contraseña, viajarán cifrados por internet (ej. a iCloud o Google Drive).
- **Protección XSS**: La visualización de datos utiliza métodos seguros (`textContent`) para prevenir ataques de inyección de código.
- **Transparencia**: La geolocalización utiliza OpenStreetMap para verificar las tiendas cercanas. No se envían datos identificativos del usuario a terceros.
- **Listo para el RGPD**: Sin perfiles, sin necesidad de registro. El usuario tiene el control total (derecho al olvido y portabilidad) sobre su información.

## 🚀 Tecnologías utilizadas
- **Vanilla JavaScript**: Sin frameworks pesados para el máximo rendimiento.
- **Vite**: Para una compilación rápida y optimizada.
- **Lucide Icons**: Iconos vectoriales elegantes y nítidos.
- **BWIP-JS**: Generación de códigos de barras de alta precisión.
- **HTML5-QRCode**: Motor de escaneo robusto y fiable.
- **GitHub Pages**: Alojamiento estático seguro y resistente.

## 📱 Instalación
Abre [https://skinny1973.github.io/digishoppingcard/](https://skinny1973.github.io/digishoppingcard/) en tu smartphone y usa la función "Añadir a la pantalla de inicio" de tu navegador.
