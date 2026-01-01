import { createIcons, Smartphone, Camera, Search, Layout, Share2, MapPin, WifiOff, ShieldCheck, CheckCircle, Apple, Share, MoreVertical } from 'lucide'
import './landing.css'
import { translations } from './translations.js'

// --- i18n Setup ---
let currentLang = localStorage.getItem('digicard_lang') ||
    (translations[navigator.language.split('-')[0]] ? navigator.language.split('-')[0] : 'it');

function t(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

function updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerHTML = t(key);
    });
    document.getElementById('languageSelect').value = currentLang;
    document.documentElement.lang = currentLang;
}

// Initial UI Update
updateUI();

// Event Listeners
document.getElementById('languageSelect').addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('digicard_lang', currentLang);
    updateUI();
});

createIcons({
    icons: {
        Smartphone,
        Camera,
        Search,
        Layout,
        Share2,
        MapPin,
        WifiOff,
        ShieldCheck,
        CheckCircle,
        Apple,
        Share,
        MoreVertical
    }
})
