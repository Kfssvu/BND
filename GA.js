
function loadGA() {
    // Dynamically load the GA script
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
    // Disable or enable all game buttons
    const buttons = document.querySelectorAll('.tile');
    buttons.forEach(btn => {
        // tiles are actual <button> elements so disable them when needed
        btn.disabled = !enabled;
        btn.style.opacity = enabled ? '1' : '0.5';
        btn.style.pointerEvents = enabled ? 'auto' : 'none';
    });
    // Optionally, disable other interactive elements here
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
        // user previously rejected: enable games but do not load GA
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
    // Do not load GA when the user rejects; enable games.
    setGameEnabled(true);
}

document.addEventListener('DOMContentLoaded', function() {
    showConsentPopup();
    document.getElementById('consent-accept').onclick = acceptConsent;
    document.getElementById('consent-reject').onclick = rejectConsent;
});
