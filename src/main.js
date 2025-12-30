import './style.css'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import bwipjs from 'bwip-js'
import { createIcons, Plus, X, Camera, Trash2, Smartphone, Settings, Download, Upload, Search, Lock } from 'lucide'

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
    wrong_password: 'Password errata o file corrotto.',
    search_placeholder: 'Cerca carta...',
    category_label: 'Categoria',
    cat_other: 'Altro',
    cat_groceries: 'Spesa',
    cat_fashion: 'Abbigliamento',
    cat_tech: 'Elettronica',
    cat_health: 'Salute',
    cat_home: 'Casa',
    security_section: 'Sicurezza',
    biometric_lock: 'Blocco Biometrico (FaceID/TouchID)',
    app_locked: 'App Bloccata',
    auth_required: 'Usa il FaceID o TouchID per accedere alle tue carte.',
    unlock_btn: 'Sblocca',
    auth_fail: 'Autenticazione fallita. Riprova.'
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
    wrong_password: 'Wrong password or corrupted file.',
    search_placeholder: 'Search card...',
    category_label: 'Category',
    cat_other: 'Other',
    cat_groceries: 'Groceries',
    cat_fashion: 'Fashion',
    cat_tech: 'Tech',
    cat_health: 'Health',
    cat_home: 'Home',
    security_section: 'Security',
    biometric_lock: 'Biometric Lock (FaceID/TouchID)',
    app_locked: 'App Locked',
    auth_required: 'Use FaceID or TouchID to access your cards.',
    unlock_btn: 'Unlock',
    auth_fail: 'Authentication failed. Please try again.'
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
    wrong_password: 'Contraseña incorrecta o archivo dañado.',
    search_placeholder: 'Buscar tarjeta...',
    category_label: 'Categoría',
    cat_other: 'Otro',
    cat_groceries: 'Supermercado',
    cat_fashion: 'Moda',
    cat_tech: 'Tecnología',
    cat_health: 'Salud',
    cat_home: 'Hogar',
    security_section: 'Seguridad',
    biometric_lock: 'Bloqueio Biométrico',
    app_locked: 'App Bloqueada',
    auth_required: 'Usa FaceID o TouchID para acceder.',
    unlock_btn: 'Desbloquear',
    auth_fail: 'Autenticación fallida.'
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
    wrong_password: 'Mot de passe incorrect ou fichier corrompu.',
    search_placeholder: 'Rechercher une carte...',
    category_label: 'Catégorie',
    cat_other: 'Autre',
    cat_groceries: 'Courses',
    cat_fashion: 'Mode',
    cat_tech: 'High-Tech',
    cat_health: 'Santé',
    cat_home: 'Maison',
    security_section: 'Sécurité',
    biometric_lock: 'Verrouillage Biométrique',
    app_locked: 'App Verrouillée',
    auth_required: 'Utilisez FaceID ou TouchID pour accéder.',
    unlock_btn: 'Déverrouiller',
    auth_fail: 'Échec de l\'authentification.'
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
    wrong_password: 'Falsches Passwort oder beschädigte Datei.',
    search_placeholder: 'Karte suchen...',
    category_label: 'Kategorie',
    cat_other: 'Sonstiges',
    cat_groceries: 'Lebensmittel',
    cat_fashion: 'Mode',
    cat_tech: 'Technik',
    cat_health: 'Gesundheit',
    cat_home: 'Heim',
    security_section: 'Sicherheit',
    biometric_lock: 'Biometrische Sperre',
    app_locked: 'App gesperrt',
    auth_required: 'FaceID oder TouchID zum Entsperren nutzen.',
    unlock_btn: 'Entsperren',
    auth_fail: 'Authentifizierung fehlgeschlagen.'
  },
  pt: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'Meus Cartões',
    aria_add_card: 'Adicionar Cartão',
    aria_select_language: 'Selecionar Idioma',
    new_card_title: 'Novo Cartão',
    scan_btn: 'Escanear Código',
    store_name_label: 'Nome da Loja',
    store_name_placeholder: 'Ex: Continente, Pingo Doce...',
    barcode_label: 'Código de Barras',
    barcode_placeholder: 'Inserir código manualmente',
    save_btn: 'Salvar Cartão',
    close_btn: 'Fechar',
    delete_btn: 'Excluir Cartão',
    settings_title: 'Configurações',
    settings_desc: 'Gerencie seus dados locais ou exporte-os.',
    language_section: 'Idioma',
    backup_section: 'Backup e Restauração',
    backup_desc: 'Exporte seus dados para a nuvem. Pode restaurá-los enviando o mesmo arquivo.',
    export_btn: 'Exportar Backup (.json)',
    import_btn: 'Importar Backup (.json)',
    storage_info: 'Todos os dados são salvos apenas no seu dispositivo.',
    privacy_note: 'A geolocalização usa OpenStreetMap para verificar lojas próximas. Nenhum dado de identificação é enviado.',
    no_cards: 'Ainda não adicionou nenhum cartão.',
    start_tip: 'Toque no botão + para começar!',
    barcode_error: 'Erro na geração do código. Verifique se o código é válido.',
    confirm_delete: 'Tem certeza de que deseja excluir este cartão?',
    fill_fields: 'Por favor, insira o nome da loja e o código',
    camera_error: 'Não foi possível acessar a câmera. Verifique as permissões.',
    import_confirm: 'Carregou {n} cartões. Deseja substituir os atuais ou adicioná-los? (OK: Substituir, Cancelar: Adicionar)',
    import_success: 'Importação concluída com sucesso!',
    invalid_format: 'Formato de arquivo inválido.',
    read_error: 'Erro ao ler o arquivo.',
    password_prompt: 'Digite uma senha para proteger seu backup (deixe vazio para não criptografar):',
    encrypted_prompt: 'Este backup está criptografado. Digite a senha:',
    wrong_password: 'Senha incorreta ou arquivo corrompido.',
    search_placeholder: 'Pesquisar cartão...',
    category_label: 'Categoria',
    cat_other: 'Outro',
    cat_groceries: 'Mercearia',
    cat_fashion: 'Moda',
    cat_tech: 'Tecnologia',
    cat_health: 'Saúde',
    cat_home: 'Casa',
    security_section: 'Segurança',
    biometric_lock: 'Bloqueio Biométrico',
    app_locked: 'App Bloqueada',
    auth_required: 'Use FaceID ou TouchID para acessar.',
    unlock_btn: 'Desbloquear',
    auth_fail: 'Falha na autenticação.'
  },
  bn: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'আমার কার্ডগুলো',
    aria_add_card: 'কার্ড যোগ করুন',
    aria_select_language: 'ভাষা নির্বাচন করুন',
    new_card_title: 'নতুন কার্ড',
    scan_btn: 'বারকোড স্ক্যান করুন',
    store_name_label: 'দোকানের নাম',
    store_name_placeholder: 'উদা: আগোরা, স্বপ্ন...',
    barcode_label: 'বারকোড নম্বর',
    barcode_placeholder: 'ম্যানুয়ালি কোড লিখুন',
    save_btn: 'কার্ড সেভ করুন',
    close_btn: 'বন্ধ করুন',
    delete_btn: 'কার্ড মুছে ফেলুন',
    settings_title: 'সেটিংস',
    settings_desc: 'আপনার লোকাল ডেটা পরিচালনা করুন বা ব্যাকআপের জন্য এক্সপোর্ট করুন।',
    language_section: 'ভাষা',
    backup_section: 'ব্যাকআপ এবং রিস্টোর',
    backup_desc: 'ক্লাউডে আপনার ডেটা এক্সপোর্ট করুন। একই ফাইল আপলোড করে এটি রিস্টোর করতে পারেন।',
    export_btn: 'ব্যাকআপ এক্সপোর্ট (.json)',
    import_btn: 'ব্যাকআপ ইম্পোর্ট (.json)',
    storage_info: 'সব ডেটা শুধুমাত্র আপনার ডিভাইসে সেভ করা থাকে।',
    privacy_note: 'কাছাকাছি দোকান যাচাই করতে জিওলোকেশন OpenStreetMap ব্যবহার করে। কোন শনাক্তকারী ডেটা পাঠানো হয় না।',
    no_cards: 'আপনি এখনও কোন কার্ড যোগ করেননি।',
    start_tip: 'শুরু করতে + বাটনে ট্যাপ করুন!',
    barcode_error: 'বারকোড তৈরি করতে সমস্যা হয়েছে। কোডটি সঠিক কিনা যাচাই করুন।',
    confirm_delete: 'আপনি কি নিশ্চিত যে এই কার্ডটি মুছে ফেলতে চান?',
    fill_fields: 'দোকানের নাম এবং কোড লিখুন',
    camera_error: 'ক্যামেরা ব্যবহার করা যাচ্ছে না। অনুমতি যাচাই করুন।',
    import_confirm: 'আপনি {n}টি কার্ড লোড করেছেন। বর্তমান কার্ডগুলো কি প্রতিস্থাপন করবেন নাকি যোগ করবেন? (OK: প্রতিস্থাপন, Cancel: যোগ)',
    import_success: 'ইম্পোর্ট সফলভাবে সম্পন্ন হয়েছে!',
    invalid_format: 'ফাইলের ফরম্যাট সঠিক নয়।',
    read_error: 'ফাইল পড়তে সমস্যা হয়েছে।',
    password_prompt: 'আপনার ব্যাকআপ সুরক্ষিত করতে একটি পাসওয়ার্ড দিন (এনক্রিপ্ট না করতে চাইলে খালি রাখুন):',
    encrypted_prompt: 'এই ব্যাকআপটি এনক্রিপ্ট করা। পাসওয়ার্ড দিন:',
    wrong_password: 'ভুল পাসওয়ার্ড বা ফাইল নষ্ট হয়ে গেছে।',
    search_placeholder: 'কার্ড খুঁজুন...',
    category_label: 'শ্রেণী',
    cat_other: 'অন্যান্য',
    cat_groceries: 'মুদি',
    cat_fashion: 'ফ্যাশন',
    cat_tech: 'প্রযুক্তি',
    cat_health: 'স্বাস্থ্য',
    cat_home: 'বাসা',
    security_section: 'নিরাপত্তা',
    biometric_lock: 'বায়োমেট্রিক লক',
    app_locked: 'অ্যাপ লক করা হয়েছে',
    auth_required: 'অ্যাক্সেস করতে FaceID বা TouchID ব্যবহার করুন।',
    unlock_btn: 'আনলক করুন',
    auth_fail: 'প্রমাণীকরণ ব্যর্থ হয়েছে।'
  },
  ar: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'بطاقاتي',
    aria_add_card: 'إضافة بطاقة',
    aria_select_language: 'اختر اللغة',
    new_card_title: 'بطاقة جديدة',
    scan_btn: 'مسح الباركود',
    store_name_label: 'اسم المتجر',
    store_name_placeholder: 'مثال: كارفور، لولو...',
    barcode_label: 'قيمة الباركود',
    barcode_placeholder: 'أدخل الرمز يدوياً',
    save_btn: 'حفظ البطاقة',
    close_btn: 'إغلاق',
    delete_btn: 'حذف البطاقة',
    settings_title: 'الإعدادات',
    settings_desc: 'إدارة بياناتك المحلية أو تصديرها للنسخ الاحتياطي.',
    language_section: 'اللغة',
    backup_section: 'النسخ الاحتياطي والاستعادة',
    backup_desc: 'تصدير بياناتك إلى السحابة. يمكنك استعادتها عن طريق تحميل نفس الملف.',
    export_btn: 'تصدير النسخة الاحتياطية (.json)',
    import_btn: 'استيراد النسخة الاحتياطية (.json)',
    storage_info: 'يتم حفظ جميع البيانات على جهازك فقط.',
    privacy_note: 'تستخدم ميزة الموقع الجغرافي OpenStreetMap للتحقق من المتاجر القريبة. لا يتم إرسال أي بيانات تعريفية.',
    no_cards: 'لم تقم بإضافة أي بطاقات بعد.',
    start_tip: 'اضغط على زر + للبدء!',
    barcode_error: 'خطأ في إنشاء الباركود. يرجى التأكد من صحة الرمز.',
    confirm_delete: 'هل أنت متأكد أنك تريد حذف هذه البطاقة؟',
    fill_fields: 'يرجى إدخال اسم المتجر والرمز',
    camera_error: 'تعذر الوصول إلى الكاميرا. يرجى التحقق من الأذونات.',
    import_confirm: 'لقد قمت بتحميل {n} بطاقات. هل تريد استبدال بطاقاتك الحالية أم إضافتها؟ (موافق: استبدال، إلغاء: إضافة)',
    import_success: 'تم الاستيراد بنجاح!',
    invalid_format: 'تنسيق ملف غير صالح.',
    read_error: 'خطأ في قراءة الملف.',
    password_prompt: 'أدخل كلمة مرور لحماية نسختك الاحتياطية (اتركها فارغة لعدم التشفير):',
    encrypted_prompt: 'هذه النسخة الاحتياطية مشفرة. أدخل كلمة المرور:',
    wrong_password: 'كلمة مرور خاطئة أو ملف تالف.',
    search_placeholder: 'البحث عن بطاقة...',
    category_label: 'الفئة',
    cat_other: 'أخرى',
    cat_groceries: 'بقالة',
    cat_fashion: 'أزياء',
    cat_tech: 'تقنية',
    cat_health: 'صحة',
    cat_home: 'منزل',
    security_section: 'الأمان',
    biometric_lock: 'القفل البيومتري',
    app_locked: 'التطبيق مقفل',
    auth_required: 'استخدم FaceID أو TouchID للوصول إلى بطاقاتك.',
    unlock_btn: 'فتح القفل',
    auth_fail: 'فشل المصادقة.'
  },
  ru: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'Мои карты',
    aria_add_card: 'Добавить карту',
    aria_select_language: 'Выберите язык',
    new_card_title: 'Новая карта',
    scan_btn: 'Сканировать штрих-код',
    store_name_label: 'Название магазина',
    store_name_placeholder: 'Напр: Пятерочка, Магнит...',
    barcode_label: 'Код штрих-кода',
    barcode_placeholder: 'Введите код вручную',
    save_btn: 'Сохранить карту',
    close_btn: 'Закрыть',
    delete_btn: 'Удалить карту',
    settings_title: 'Настройки',
    settings_desc: 'Управляйте данными локально или экспортируйте их.',
    language_section: 'Язык',
    backup_section: 'Резервное копирование',
    backup_desc: 'Экспортируйте данные в облако. Вы можете восстановить их, загрузив тот же файл.',
    export_btn: 'Экспорт бэкапа (.json)',
    import_btn: 'Импорт бэкапа (.json)',
    storage_info: 'Все данные сохраняются только на вашем устройстве.',
    privacy_note: 'Геолокация использует OpenStreetMap для проверки магазинов рядом. Идентификационные данные не передаются.',
    no_cards: 'Вы еще не добавили ни одной карты.',
    start_tip: 'Нажмите кнопку +, чтобы начать!',
    barcode_error: 'Ошибка генерации штрих-кода. Убедитесь в его правильности.',
    confirm_delete: 'Вы уверены, что хотите удалить эту карту?',
    fill_fields: 'Пожалуйста, введите название магазина и код',
    camera_error: 'Не удалось получить доступ к камере. Проверьте разрешения.',
    import_confirm: 'Загружено {n} карт. Заменить текущие или добавить к ним? (ОК: Заменить, Отмена: Добавить)',
    import_success: 'Импорт успешно завершен!',
    invalid_format: 'Неверный формат файла.',
    read_error: 'Ошибка при чтении файла.',
    password_prompt: 'Введите пароль для защиты бэкапа (оставьте пустым без шифрования):',
    encrypted_prompt: 'Этот бэкап зашифрован. Введите пароль:',
    wrong_password: 'Неверный пароль или файл поврежден.',
    search_placeholder: 'Поиск карты...',
    category_label: 'Категория',
    cat_other: 'Другое',
    cat_groceries: 'Продукты',
    cat_fashion: 'Мода',
    cat_tech: 'Техника',
    cat_health: 'Здоровье',
    cat_home: 'Дом',
    security_section: 'Безопасность',
    biometric_lock: 'Биометрическая блокировка',
    app_locked: 'Приложение заблокировано',
    auth_required: 'Используйте FaceID или TouchID для доступа к вашим картам.',
    unlock_btn: 'Разблокировать',
    auth_fail: 'Ошибка аутентификации.'
  },
  id: {
    app_title: 'DigiShoppingCard',
    app_subtitle: 'Kartu Saya',
    aria_add_card: 'Tambah Kartu',
    aria_select_language: 'Pilih Bahasa',
    new_card_title: 'Kartu Baru',
    scan_btn: 'Pindai Barcode',
    store_name_label: 'Nama Toko',
    store_name_placeholder: 'Misal: Alfamart, Indomaret...',
    barcode_label: 'Nilai Barcode',
    barcode_placeholder: 'Masukkan kode secara manual',
    save_btn: 'Simpan Kartu',
    close_btn: 'Tutup',
    delete_btn: 'Hapus Kartu',
    settings_title: 'Pengaturan',
    settings_desc: 'Kelola data lokal atau ekspor untuk cadangan.',
    language_section: 'Bahasa',
    backup_section: 'Cadangan & Pemulihan',
    backup_desc: 'Ekspor data ke cloud. Anda dapat memulihkannya dengan mengunggah file yang sama.',
    export_btn: 'Ekspor Cadangan (.json)',
    import_btn: 'Impor Cadangan (.json)',
    storage_info: 'Semua data hanya disimpan di perangkat Anda.',
    privacy_note: 'Fitur geolokasi menggunakan OpenStreetMap untuk verifikasi toko terdekat. Tidak ada data identitas yang dikirim.',
    no_cards: 'Anda belum menambahkan kartu apa pun.',
    start_tip: 'Ketuk tombol + untuk memulai!',
    barcode_error: 'Kesalahan pembuatan barcode. Pastikan kode valid.',
    confirm_delete: 'Apakah Anda yakin ingin menghapus kartu ini?',
    fill_fields: 'Harap masukkan nama toko dan kode',
    camera_error: 'Tidak dapat mengakses kamera. Harap periksa izin.',
    import_confirm: 'Anda memuat {n} kartu. Ganti kartu saat ini atau tambahkan? (OK: Ganti, Batal: Tambah)',
    import_success: 'Impor berhasil diselesaikan!',
    invalid_format: 'Format file tidak valid.',
    read_error: 'Kesalahan saat membaca file.',
    password_prompt: 'Masukkan kata sandi untuk melindungi cadangan (kosongkan jika tidak dienkripsi):',
    encrypted_prompt: 'Cadangan ini dienkripsi. Masukkan kata sandi:',
    wrong_password: 'Kata sandi salah atau file rusak.',
    search_placeholder: 'Cari kartu...',
    category_label: 'Kategori',
    cat_other: 'Lainnya',
    cat_groceries: 'Belanjaan',
    cat_fashion: 'Mode',
    cat_tech: 'Teknologi',
    cat_health: 'Kesehatan',
    cat_home: 'Rumah',
    security_section: 'Keamanan',
    biometric_lock: 'Kunci Biometrik',
    app_locked: 'Aplikasi Terkunci',
    auth_required: 'Gunakan FaceID atau TouchID untuk mengakses kartu Anda.',
    unlock_btn: 'Buka Kunci',
    auth_fail: 'Autentikasi gagal.'
  }
}

let currentLang = localStorage.getItem('app_lang') ||
  (navigator.language.startsWith('it') ? 'it' :
    translations[navigator.language.split('-')[0]] ? navigator.language.split('-')[0] : 'en')

let isLocked = localStorage.getItem('app_locked') === 'true'
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

// --- Biometric Auth ---
const authenticate = async () => {
  if (!window.isSecureContext) {
    alert('L\'autenticazione richiede una connessione sicura (HTTPS).');
    document.getElementById('lockScreen').classList.remove('active');
    return;
  }

  if (!window.PublicKeyCredential) {
    alert('Il tuo browser non supporta le funzionalità di sicurezza biometrica.');
    document.getElementById('lockScreen').classList.remove('active');
    return;
  }

  try {
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();

    if (!available) {
      alert('Sensore biometrico non disponibile o non configurato su questo dispositivo.');
      document.getElementById('lockScreen').classList.remove('active');
      return;
    }

    // Configurazione WebAuthn per attivare il prompt di sistema
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const createOptions = {
      publicKey: {
        rp: {
          name: "DigiShoppingCard",
          id: window.location.hostname
        },
        user: {
          id: new Uint8Array(16),
          name: "local-user",
          displayName: "Utente Locale"
        },
        challenge: challenge,
        pubKeyCredParams: [
          { alg: -7, type: "public-key" }, // ES256
          { alg: -257, type: "public-key" } // RS256
        ],
        timeout: 60000,
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required"
        },
        attestation: "none"
      }
    };

    const credential = await navigator.credentials.create(createOptions);

    if (credential) {
      document.getElementById('lockScreen').classList.remove('active');
      isLocked = false;
    }
  } catch (err) {
    console.error('Auth error:', err);
    if (err.name === 'NotAllowedError') {
      // L'utente ha annullato la scansione, non facciamo nulla (resta bloccato)
    } else if (err.name === 'SecurityError') {
      alert('Errore di sicurezza: assicurati di usare il dominio corretto.');
      document.getElementById('lockScreen').classList.remove('active');
    } else {
      alert(t('auth_fail') + ' (' + err.name + ')');
    }
  }
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
const biometricToggle = document.getElementById('biometricToggle')
const unlockBtn = document.getElementById('unlockBtn')
const searchInput = document.getElementById('searchInput')
const cardCategorySelect = document.getElementById('cardCategory')

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

biometricToggle.checked = localStorage.getItem('app_locked') === 'true'
biometricToggle.onchange = (e) => {
  localStorage.setItem('app_locked', e.target.checked)
}

unlockBtn.onclick = authenticate

// Fullscreen check on start
if (localStorage.getItem('app_locked') === 'true') {
  document.getElementById('lockScreen').classList.add('active')
}

// Initial Render
updateUI()
renderCards()
updateLocation()
createIcons({
  icons: { Plus, X, Camera, Trash2, Smartphone, Settings, Download, Upload, Search, Lock }
})
