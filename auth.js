
// ============================================
// AUTHENTICATION SYSTEM
// ============================================
function checkLogin() {
    // SITE_CONFIG index.html içinde tanımlı
    // Eğer tanımlı değilse güvenlik için varsayılan değerler
    const config = (typeof SITE_CONFIG !== 'undefined') ? SITE_CONFIG : {
        version: 'v1.0',
        passwords: ['mek2026', 'admin123']
    };

    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('login-error-msg');
    const overlay = document.getElementById('login-overlay');

    const enteredPass = input.value.trim();

    if (config.passwords.includes(enteredPass)) {
        // BAŞARILI GİRİŞ
        localStorage.setItem('auth_status', 'granted');
        localStorage.setItem('auth_version', config.version);

        // Animasyonla gizle
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        document.documentElement.classList.add('auth-granted');

        // Hata mesajını gizle
        errorMsg.style.display = 'none';
    } else {
        // HATALI ŞİFRE
        errorMsg.style.display = 'block';
        input.value = '';
        input.focus();

        // Shake animasyonu için class ekle-kaldır
        const card = document.querySelector('.login-card');
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = 'shake 0.5s ease-in-out';
    }
}

// ============================================
// OTOMATİK VERSİYON KONTROLÜ (AUTO-REFRESH)
// ============================================
// Her 10 saniyede bir sitenin versiyonunu kontrol et
// Eğer versiyon değişmişse, sayfayı zorla yenile ve oturumu kapat

setInterval(checkForUpdates, 10000); // 10 saniye

async function checkForUpdates() {
    try {
        // Cache'i atlamak için timestamp ekliyoruz
        const response = await fetch('index.html?t=' + new Date().getTime());
        const html = await response.text();

        // HTML içindeki versiyonu bul: version: 'v1.0'
        const versionMatch = html.match(/version:\s*'([^']+)'/);

        if (versionMatch && versionMatch[1]) {
            const serverVersion = versionMatch[1];
            const localVersion = localStorage.getItem('auth_version');

            // Eğer serverdaki versiyon farklıysa ve bizde bir versiyon kayıtlıysa
            if (localVersion && serverVersion !== localVersion) {
                console.log('Yeni versiyon tespit edildi: ' + serverVersion);
                // Oturumu kapat
                localStorage.removeItem('auth_status');
                localStorage.removeItem('auth_version');
                // Sayfayı yenile
                window.location.reload(true);
            }
        }
    } catch (error) {
        console.error('Versiyon kontrolü yapılamadı:', error);
    }
}
