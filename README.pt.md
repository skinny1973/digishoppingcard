# DigiShoppingCard PWA 🪪

Uma aplicação web progressiva (PWA) moderna, rápida e segura para digitalizar seus cartões de fidelidade.

## ✨ Recursos
- **Scan Rápido**: Adicione cartões escaneando o código de barras com sua câmera.
- **Geolocalização Inteligente**: O aplicativo aprende onde você usa seus cartões e os mostra no topo da lista quando você está perto da loja.
- **Design Premium**: Interface móvel otimizada com modo escuro, animações fluidas e ícones nítidos.
- **Funcionalidade Offline**: Funciona sem conexão à internet uma vez instalado no seu dispositivo.

## 🔒 Segurança e Privacidade (Conforme o RGPD)
O aplicativo foi projetado seguindo o princípio de **Privacidade desde o Design**:

- **Local-First**: Todos os dados dos seus cartões são salvos exclusivamente no `localStorage` do seu navegador. Nenhum dado é enviado para servidores centrais.
- **Backup Criptografado**: Backups exportados podem ser protegidos com criptografia **AES-256-GCM**. Os dados estão em texto claro apenas no seu dispositivo; se protegidos por senha, viajam criptografados pela internet (ex: para iCloud ou Google Drive).
- **Proteção XSS**: A renderização de dados usa métodos seguros (`textContent`) para prevenir ataques de injeção de script.
- **Transparência**: A geolocalização usa OpenStreetMap para verificar lojas próximas. Nenhum dado de identificação do usuário é enviado a terceiros.
- **Pronto para o RGPD**: Sem perfis, sem necessidade de registro. O usuário tem controle total (direito ao esquecimento e portabilidade) sobre suas informações.

## 🚀 Stack Técnica
- **Vanilla JavaScript**: Zero frameworks pesados para o máximo desempenho.
- **Vite**: Para um build rápido e otimizado.
- **Lucide Icons**: Ícones vetoriais elegantes e nítidos.
- **BWIP-JS**: Geração de códigos de barras de alta precisão.
- **HTML5-QRCode**: Motor de escaneamento robusto e confiável.
- **GitHub Pages**: Hospedagem estática segura e resiliente.

## 📱 Instalação
Abra [https://skinny1973.github.io/digishoppingcard/](https://skinny1973.github.io/digishoppingcard/) no seu smartphone e use a função "Adicionar à tela inicial" do seu navegador.
