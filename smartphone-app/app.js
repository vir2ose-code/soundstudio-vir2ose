const USE_AI_GENERATION = false; // Hybrid Switch: ONLY use local MP3 libraries

const translations = {
    'de': {
        'hero_title': 'SONGWRITING <span class="gold-gradient">UNTERWEGS</span>',
        'studio_status': 'Bereit für deine Vision.',
        'gen_title': 'AI-Prompt Engine',
        'gen_label_style': 'STYLE',
        'gen_btn_generate': 'PROMPT GENERIEREN',
        'sound_engine_title': 'AI-Sound Engine',
        'gen_btn_compose': 'SOUND KOMPONIEREN',
        'portfolio_title': 'PORTFOLIO',
        'contact_title': 'KONTAKT',
        'gen_opt_rock': 'Rock',
        'gen_opt_techno': 'Techno',
        'gen_opt_lofi': 'Lofi Hiphop',
        'gen_opt_cinematic': 'Cinematic',
        'sample_techno': 'Industrial Techno Loop',
        'sample_lofi': 'Luxury Lofi Beat',
        'sample_drill': 'Hard-Hitting Drill',
        'nav_studio': 'STUDIO',
        'nav_services': 'SERVICES',
        'nav_about': 'ÜBER MICH',
        'nav_portfolio': 'PORTFOLIO',
        'nav_contact': 'KONTAKT',
        'title_tagline': 'DIE ZUKUNFT GEMEINSAM GESTALTEN'
    },
    'en': {
        'hero_title': 'SONGWRITING <span class="gold-gradient">ON THE GO</span>',
        'studio_status': 'Ready for your vision.',
        'gen_title': 'AI-Prompt Engine',
        'gen_label_style': 'STYLE',
        'gen_btn_generate': 'GENERATE PROMPT',
        'sound_engine_title': 'AI-Sound Engine',
        'gen_btn_compose': 'COMPOSE SOUND',
        'portfolio_title': 'PORTFOLIO',
        'contact_title': 'CONTACT',
        'gen_opt_rock': 'Rock',
        'gen_opt_techno': 'Techno',
        'gen_opt_lofi': 'Lofi Hiphop',
        'gen_opt_cinematic': 'Cinematic',
        'sample_techno': 'Industrial Techno Loop',
        'sample_lofi': 'Luxury Lofi Beat',
        'sample_drill': 'Hard-Hitting Drill',
        'nav_studio': 'STUDIO',
        'nav_services': 'SERVICES',
        'nav_about': 'ABOUT ME',
        'nav_portfolio': 'PORTFOLIO',
        'nav_contact': 'CONTACT',
        'title_tagline': 'SHAPING THE FUTURE TOGETHER'
    },
    'pl': {
        'hero_title': 'SONGWRITING <span class="gold-gradient">W DRODZE</span>',
        'studio_status': 'Gotowy na Twoją wizję.',
        'gen_title': 'AI-Prompt Engine',
        'gen_label_style': 'STYL',
        'gen_btn_generate': 'GENERUJ PROMPT',
        'sound_engine_title': 'AI-Sound Engine',
        'gen_btn_compose': 'KOMPONUJ DŹWIĘK',
        'portfolio_title': 'PORTFOLIO',
        'contact_title': 'KONTAKT',
        'gen_opt_rock': 'Rock',
        'gen_opt_techno': 'Techno',
        'gen_opt_lofi': 'Lofi Hiphop',
        'gen_opt_cinematic': 'Cinematic',
        'nav_studio': 'STUDIO',
        'nav_services': 'USŁUGI',
        'nav_about': 'O MNIE',
        'nav_portfolio': 'PORTFOLIO',
        'nav_contact': 'KONTAKT',
        'title_tagline': 'WSPÓLNIE KSZTAŁTUJEMY PRZYSZŁOŚĆ'
    },
    'es': {
        'hero_title': 'SONGWRITING <span class="gold-gradient">EN MOVIMIENTO</span>',
        'studio_status': 'Listo para tu visión.',
        'gen_title': 'AI-Prompt Engine',
        'gen_label_style': 'ESTILO',
        'gen_btn_generate': 'GENERAR PROMPT',
        'sound_engine_title': 'AI-Sound Engine',
        'gen_btn_compose': 'COMPONER SONIDO',
        'portfolio_title': 'PORTAFOLIO',
        'contact_title': 'CONTACTO',
        'gen_opt_rock': 'Rock',
        'gen_opt_techno': 'Techno',
        'gen_opt_lofi': 'Lofi Hiphop',
        'gen_opt_cinematic': 'Cinematic',
        'nav_studio': 'ESTUDIO',
        'nav_services': 'SERVICIOS',
        'nav_about': 'SOBRE MÍ',
        'nav_portfolio': 'PORTAFOLIO',
        'nav_contact': 'CONTACTO',
        'title_tagline': 'DISEÑANDO EL FUTURO JUNTOS'
    }
};

let currentLang = localStorage.getItem('appLang') || 'de';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('appLang', lang);
    document.body.lang = lang; // Drive CSS strict language visibility
    updateUI();
    initPortfolio();
}

function updateUI() {
    const t = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    const genreSelect = document.getElementById('genre');
    if (genreSelect) {
        genreSelect.options[0].text = t['gen_opt_rock'];
        genreSelect.options[1].text = t['gen_opt_techno'];
        genreSelect.options[2].text = t['gen_opt_lofi'];
        genreSelect.options[3].text = t['gen_opt_cinematic'];
    }
}

// Drawer Logic
function toggleDrawer() {
    const drawer = document.getElementById('nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        overlay.classList.remove('visible');
    } else {
        drawer.classList.add('open');
        overlay.classList.add('visible');
    }
}

// Tab Switching
function switchTab(tabId) {
    document.querySelectorAll('.app-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');

    const navItems = document.querySelectorAll('.nav-item');
    if (tabId === 'studio') navItems[0].classList.add('active');
    else if (tabId === 'generator') navItems[1].classList.add('active');
    else if (tabId === 'music') navItems[2].classList.add('active');
    else if (tabId === 'mail') navItems[3].classList.add('active');

    document.getElementById('app-content').scrollTo({top: 0, behavior: 'smooth'});
}

function navigateTo(view) {
    // Navigate to specific sub-pages or sections
    if (view === 'services' || view === 'about') {
        alert(`Information for ${view} will be displayed here in Phase 44.`);
    }
    toggleDrawer();
}

/**
 * Phase 43: Generic Scroll Helper
 */
function scrollToElement(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ──────────────── Newsletter Integration (Phase 49) ────────────────
async function handleNewsletterMobile(event) {
    event.preventDefault();
    const email = document.getElementById('nl-email-mobile').value;
    const status = document.getElementById('nl-status-mobile');
    const button = event.target.querySelector('button');

    if (!email) return;

    status.innerText = "⏳ Verbinde...";
    status.className = "status-msg info";
    button.disabled = true;

    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            status.innerText = "✨ Willkommen im Mirror!";
            status.className = "status-msg success";
            document.getElementById('newsletter-form-mobile').reset();
        } else {
            throw new Error(data.message || 'Submission failed');
        }
    } catch (err) {
        status.innerText = "❌ Fehler. Bitte erneut versuchen.";
        status.className = "status-msg error";
        button.disabled = false;
    }
}

// ──────────────── Portfolio Initialization ────────────────
function initPortfolio() {
    const list = document.getElementById('portfolio-list');
    if (!list) return;
    const t = translations[currentLang];
    
    const samples = [
        { id: 'techno', title: t['sample_techno'] || 'Techno', meta: '130 BPM' },
        { id: 'lofi', title: t['sample_lofi'] || 'Lofi', meta: '85 BPM' },
        { id: 'drill', title: t['sample_drill'] || 'Drill', meta: '142 BPM' }
    ];

    list.innerHTML = samples.map(s => `
        <div class="portfolio-item glass" onclick="playPortfolio('${s.id}')">
            <div class="item-info">
                <h4>${s.title}</h4>
                <p>${s.meta}</p>
            </div>
            <div class="play-btn-mini">▶</div>
        </div>
    `).join('');
}

function playPortfolio(id) {
    alert(`Playing ${id} preview...`);
}

// ──────────────── Particle System ────────────────
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 35; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// ──────────────── Wave System ────────────────
const waveCanvas = document.getElementById('wave-canvas');
const wCtx = waveCanvas.getContext('2d');
let waveTime = 0;

function resizeWave() {
    const parent = waveCanvas.parentElement;
    if (!parent) return;
    waveCanvas.width = parent.clientWidth;
    waveCanvas.height = parent.clientHeight;
}

function drawWave() {
    if (document.getElementById('tab-studio').classList.contains('active')) {
        wCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
        drawWaveLayer('rgba(212, 175, 55, 0.3)', 1, 15);
        drawWaveLayer('rgba(212, 175, 55, 0.1)', 0.5, 25);
        waveTime += 0.03;
    }
    requestAnimationFrame(drawWave);
}

function drawWaveLayer(color, speedMult, amplitude) {
    wCtx.beginPath();
    wCtx.strokeStyle = color;
    wCtx.lineWidth = 1.5;
    const mid = waveCanvas.height / 2;
    wCtx.moveTo(0, mid);
    for (let x = 0; x <= waveCanvas.width; x += 10) {
        const y = mid + Math.sin(x * 0.015 + waveTime * speedMult) * amplitude;
        wCtx.lineTo(x, y);
    }
    wCtx.stroke();
}

// ──────────────── Generator Logic ────────────────
function generatePrompt() {
    const genre = document.getElementById('genre').value;
    const promptBox = document.getElementById('generated-prompt');
    promptBox.innerHTML = `<span class="gold-gradient">Composing Vision...</span>`;
    
    setTimeout(() => {
        promptBox.innerText = `${genre}, cinematic atmosphere, deep analog textures, professional mixing, 44.1kHz.`;
    }, 1500);
}

let wavesurfer;
function initWavesurfer() {
    const container = document.getElementById('waveform-mini');
    if (!container) return;
    wavesurfer = WaveSurfer.create({
        container: '#waveform-mini',
        waveColor: 'rgba(255,255,255,0.1)',
        progressColor: '#d4af37',
        cursorColor: 'transparent',
        barWidth: 3,
        barRadius: 3,
        height: 60,
        responsive: true
    });
}

function startSoundGeneration() {
    const status = document.createElement('div');
    status.className = 'gold-gradient';
    status.style.fontSize = '12px';
    status.style.marginTop = '10px';
    status.innerText = "Synthesizing AI Audio Object...";
    document.getElementById('tab-generator').appendChild(status);
    setTimeout(() => status.remove(), 2000);
}

window.addEventListener('resize', () => {
    resize();
    resizeWave();
});

window.addEventListener('load', () => {
    resize();
    resizeWave();
    initParticles();
    animate();
    drawWave();
    document.body.lang = currentLang; // Phase 43 sync
    updateUI();
    initPortfolio();
    initWavesurfer();

    // Newsletter Listener
    const nlForm = document.getElementById('newsletter-form-mobile');
    if (nlForm) nlForm.addEventListener('submit', handleNewsletterMobile);
});
