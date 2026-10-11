function loadGA() {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-5YGZ8K86JH';
    document.head.appendChild(gaScript);

    gaScript.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-5YGZ8K86JH');
    };
}

function setGameEnabled(enabled) {
    const buttons = document.querySelectorAll('.tile');
    buttons.forEach(btn => {
        // Leave permanently disabled buttons (like Count's) untouched
        if (btn.id === 'countstile') return;
        
        btn.disabled = !enabled;
        btn.style.opacity = enabled ? '1' : '0.5';
        btn.style.pointerEvents = enabled ? 'auto' : 'none';
    });
}

function showConsentPopup() {
    const consent = localStorage.getItem('ga_consent');
    if (consent === null) {
        document.getElementById('consent-popup').style.display = 'block';
        setGameEnabled(false);
    } else if (consent === 'true') {
        setGameEnabled(true);
        loadGA();
    } else {
        setGameEnabled(true);
    }
}

function acceptConsent() {
    localStorage.setItem('ga_consent', 'true');
    document.getElementById('consent-popup').style.display = 'none';
    setGameEnabled(true);
    loadGA();
}

function rejectConsent() {
    localStorage.setItem('ga_consent', 'false');
    document.getElementById('consent-popup').style.display = 'none';
    setGameEnabled(true);
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ms,zh-CN,ta',
        autoDisplay: false
    }, 'google_translate_element');
}

function triggerGoogleTranslate(langCode) {
    // Set the google translate cookie to the selected language
    const domain = window.location.hostname;
    const cookieValue = `/en/${langCode}`;
    
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; domain=.${domain}; path=/;`;
    
    // Reload to apply the translation
    window.location.reload();
}

// Keep the dropdown showing the currently selected language after reload
document.addEventListener('DOMContentLoaded', () => {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-zA-Z\-]+)/);
    if (match && match[1]) {
        const select = document.getElementById('language-select');
        if (select) select.value = match[1];
    }
});

document.addEventListener('DOMContentLoaded', function() {
    showConsentPopup();
    document.getElementById('consent-accept').onclick = acceptConsent;
    document.getElementById('consent-reject').onclick = rejectConsent;
});