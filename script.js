document.addEventListener('DOMContentLoaded', () => {
    // ──────────────── Multi-language Support ────────────────
    let currentSoundURL = '';

    const translations = {
        'de': {
            'nav_studio': 'STUDIO',
            'nav_services': 'SERVICES',
            'nav_portfolio': 'PORTFOLIO',
            'nav_contact': 'KONTAKT',
            'title_main': 'SOUND STUDIO HANNOVER',
            'title_sub': 'SAMPLE <span class="highlight">SOUNDDESIGN</span> BEATS',
            'title_tagline': 'DIE ZUKUNFT GEMEINSAM GESTALTEN',
            'powered_by': 'powered by',
            'btn_explore': 'ENTDECKE MEINE SOUND-SAMPLES',
            'btn_project': 'PROJEKT STARTEN',
            'scroll_text': 'SCROLLEN',
            // Generator DE
            'gen_title': 'AI-Prompt Engine',
            'gen_subtitle': 'Konfiguriere deine Klang-Vision für die KI-Generierung.',
            'gen_label_style': 'KLANG-CHARAKTER (STYLE)',
            'gen_label_mood': 'ATMOSPHÄRE (MOOD)',
            'gen_opt_industrial': 'Industrial Techno',
            'gen_opt_lofi': 'Luxury Lofi',
            'gen_opt_dark': 'Cinematic Dark',
            'gen_opt_drill': 'Hard-Hitting Drill',
            'gen_opt_house': 'Melodic House',
            'gen_opt_heavy': 'Düster & Schwer',
            'gen_opt_clear': 'Ätherisch & Klar',
            'gen_opt_rebel': 'Verzerrt & Rebellisch',
            'gen_opt_analog': 'Warm & Analog',
            'gen_btn_generate': 'GENERATE PROMPTS',
            'gen_btn_copy': 'PROMPT KOPIEREN',
            'gen_btn_play': 'DEMO ABSPIELEN 🎧',
            'gen_copied': 'KOPIERT! ✓',
            'gen_playing': 'ABSPIELEN... 🔊',
            'port_sample_house': 'Melodic House Vibe',
            // Generator 2 DE
            'gen_title_2': 'AI-Sound Engine',
            'gen_subtitle_2': 'Generiere exklusive Sound-Variationen in Echtzeit.',
            'gen_btn_generate_2': 'SOUND GENERIEREN',
            'gen_btn_download_2': 'SOUND ANHÖREN',
            'gen_btn_play_2': 'SOUND ABSPIELEN 🔊',
            'gen_playing_2': 'GENERIERTE... 🔊',
            'gen_status_ready': 'Bereit für die Generierung...',
            'gen_status_composing': 'KI komponiert deinen Beat...',
            'gen_status_done': 'Generierung abgeschlossen!',
            'gen_reset_2': 'Neuen Beat erstellen',
            'gen_download_success': 'Beat erfolgreich gespeichert!',
            'gen_download_start': '✔ Download gestartet!',
            'work_title': 'VON DER VISION ZUM MASTER',
            'work_intro': 'Willkommen im modernsten Außenposten des Sound Studio Hannover. Meine duale KI-Engine ist darauf ausgelegt, die Barriere zwischen deiner kreativen Idee und dem fertigen Klangerlebnis einzureißen.',
            'work_body': 'Während die Prompt-Engine (Links) deine abstrakten Visionen in präzise technische Anweisungen übersetzt, materialisiert die Sound-Engine (Rechts) daraus ein exklusives, KI-gestütztes Audio-Unikat. Es ist der kürzeste Weg weltweit, um Sounddesign nicht nur zu denken, sondern sofort hörbar zu machen.',
            'work_footer': 'Warum VIR2OSE? Weil ich menschliche Expertise mit der grenzenlosen Rechenpower der nächsten KI-Generation (Gemini 3 Flash) vereine. Du lieferst den Funken – ich liefere den Beat.',
            'work_btn': 'MEHR ÜBER DAS STUDIO ERFAHREN',
            // About Me DE
            'nav_about': 'ÜBER MICH',
            'about_title': 'ÜBER MICH',
            'about_intro': 'Herzlich willkommen! Mein Name ist Waldemar Krucinski. Mein professionelles Schaffen ruht auf drei wesentlichen Säulen, die kreatives Handwerk, staatlich geprüfte Expertise und technologischen Pioniergeist vereinen: Musikproduktion, Mediengestaltung und Netzwerk-Systeme.',

            'about_col1_title': '1. Musik: Staatlich geprüfte Produktion',
            'about_col1_text': 'Musik ist für mich ein ganzheitlicher Prozess auf höchstem technischem Niveau. Als staatlich geprüfter Musikproduzent (HOFA College Diploma) verfüge ich über tiefgreifendes Fachwissen in der gesamten Produktionskette. Mein Fokus liegt auf einem erstklassigen Sound und einer strukturierten Umsetzung – von der ersten Vision bis zum finalen Master.',
            'about_col1_exp_title': 'Expertise:',
            'about_col1_exp_text': 'Projektplanung, Songwriting, Sounddesign, Recording, Editing, Drum-Programming, Mixing und Mastering.',
            'about_col1_cert_title': 'Nachweis:',
            'about_col1_cert_text': 'Meine Qualifikationen sind durch das staatlich anerkannte Diploma und entsprechende Zertifizierungen belegbar.',

            'about_col2_title': '2. Mediengestaltung: Professionelles Bild & Ton',
            'about_col2_text': 'In der visuellen Welt verbinde ich kreatives Storytelling mit handwerklicher Präzision. Als IHK-geprüfter Mediengestalter Bild und Ton beherrsche ich die technischen und gestalterischen Standards der Medienbranche. Ich begleite Projekte durch alle Phasen der Postproduktion und garantiere einen professionellen Workflow.',
            'about_col2_skill_title': 'Skills:',
            'about_col2_skill_text': 'Kamera-Set-Planning, High-End-Schnitt (DaVinci Resolve Studio, Avid, FCP), Animation, Grafikbearbeitung, Synchronisation und komplette Filmproduktionen.',

            'about_col3_title': '3. Netzwerk & IT: Innovation & Zukunft',
            'about_col3_text': 'Die dritte Säule bildet meine Leidenschaft für Netzwerk-Kunst und moderne Programmierung. Hier bewege ich mich als ambitionierter "Early Adopter": Mein Interesse wächst mit jeder technologischen Neuerung. Ich experimentiere intensiv mit KI-Agenten-Tools, VS Cloud und GitHub. Mich faszinieren die Schnittstellen zwischen technischer Infrastruktur und zukunftsweisenden Konzepten wie der Antigravity-Technologie.',

            'about_claim': '<strong>Mein Anspruch:</strong> Ob Akustik, Bild oder digitale Vernetzung – ich stehe für Projekte, die durch fundiertes Know-how, zweifach staatlich anerkannte Qualität und den Mut zu neuen Technologien überzeugen.'
        },
        'en': {
            'nav_studio': 'STUDIO',
            'nav_services': 'SERVICES',
            'nav_portfolio': 'PORTFOLIO',
            'nav_contact': 'CONTACT',
            'title_main': 'SOUND STUDIO HANNOVER',
            'title_sub': 'SAMPLE <span class="highlight">SOUNDDESIGN</span> BEATS',
            'title_tagline': 'SHAPING THE FUTURE TOGETHER',
            'powered_by': 'powered by',
            'btn_explore': 'DISCOVER MY SOUND SAMPLES',
            'btn_project': 'START A PROJECT',
            'scroll_text': 'SCROLL',
            // Generator EN
            'gen_title': 'AI-Prompt Engine',
            'gen_subtitle': 'Configure your sound vision for AI generation.',
            'gen_label_style': 'SOUND CHARACTER (STYLE)',
            'gen_label_mood': 'ATMOSPHERE (MOOD)',
            'gen_opt_industrial': 'Industrial Techno',
            'gen_opt_lofi': 'Luxury Lofi',
            'gen_opt_dark': 'Cinematic Dark',
            'gen_opt_drill': 'Hard-Hitting Drill',
            'gen_opt_house': 'Melodic House',
            'gen_opt_heavy': 'Dark & Heavy',
            'gen_opt_clear': 'Ethereal & Clear',
            'gen_opt_rebel': 'Distorted & Rebellious',
            'gen_opt_analog': 'Warm & Analog',
            'gen_btn_generate': 'GENERATE PROMPTS',
            'gen_btn_copy': 'COPY PROMPT',
            'gen_btn_play': 'PLAY DEMO 🎧',
            'gen_copied': 'COPIED! ✓',
            'gen_playing': 'PLAYING... 🔊',
            'port_sample_house': 'Melodic House Vibe',
            // Generator 2 EN
            'gen_title_2': 'AI-Sound Engine',
            'gen_subtitle_2': 'Generate exclusive sound variations in real-time.',
            'gen_btn_generate_2': 'GENERATE SOUND',
            'gen_btn_download_2': 'LISTEN TO SOUND',
            'gen_btn_play_2': 'PLAY SOUND 🔊',
            'gen_playing_2': 'GENERATING... 🔊',
            'gen_status_ready': 'Ready for generation...',
            'gen_status_composing': 'AI is composing your beat...',
            'gen_status_done': 'Generation complete!',
            'gen_reset_2': 'Create new beat',
            'gen_download_success': 'Beat saved successfully!',
            'gen_download_start': '✔ Download started!',
            'work_title': 'FROM VISION TO MASTER',
            'work_intro': 'Welcome to the most modern outpost of Sound Studio Hannover. My dual AI engine is designed to break down the barrier between your creative idea and the final sound experience.',
            'work_body': 'While the Prompt Engine (Left) translates your abstract visions into precise technical instructions, the Sound Engine (Right) materializes an exclusive, AI-powered audio unique from them. It is the shortest way worldwide to not just think about sound design, but to make it audible immediately.',
            'work_footer': 'Why VIR2OSE? Because I combine human expertise with the limitless computing power of the next AI generation (Gemini 3 Flash). You provide the spark – I deliver the beat.',
            'work_btn': 'LEARN MORE ABOUT THE STUDIO',
            // About Me EN
            'nav_about': 'ABOUT',
            'about_title': 'ABOUT ME',
            'about_intro': 'Welcome! My name is Waldemar Krucinski. My professional work rests on three essential pillars that combine creative craftsmanship, state-certified expertise, and technological pioneering spirit: Music Production, Media Design, and Network Systems.',

            'about_col1_title': '1. Music: State-certified Production',
            'about_col1_text': 'For me, music is a holistic process at the highest technical level. As a state-certified Music Producer (HOFA College Diploma), I have profound expertise across the entire production chain. My focus is on premium sound and structured implementation – from the initial vision to the final master.',
            'about_col1_exp_title': 'Expertise:',
            'about_col1_exp_text': 'Project Planning, Songwriting, Sound Design, Recording, Editing, Drum Programming, Mixing, and Mastering.',
            'about_col1_cert_title': 'Verification:',
            'about_col1_cert_text': 'My qualifications are provable through the state-recognized Diploma and corresponding certificates.',

            'about_col2_title': '2. Media Design: Professional Audio & Video',
            'about_col2_text': 'In the visual world, I combine creative storytelling with craftsmanship and precision. As an IHK-certified Media Designer for Image and Sound, I master the technical and design standards of the media industry. I guide projects through all phases of post-production and guarantee a professional workflow.',
            'about_col2_skill_title': 'Skills:',
            'about_col2_skill_text': 'Camera Set Planning, High-End Video Editing (DaVinci Resolve Studio, Avid, FCP), Animation, Graphic Design, Dubbing, and complete Film Productions.',

            'about_col3_title': '3. Network & IT: Innovation & Future',
            'about_col3_text': 'The third pillar forms my passion for network art and modern programming. Here I operate as an ambitious "Early Adopter": My interest grows with every technological innovation. I experiment extensively with AI Agent tools, VS Cloud, and GitHub. I am fascinated by the intersections between technical infrastructure and forward-looking concepts like Antigravity technology.',

            'about_claim': '<strong>My Claim:</strong> Whether acoustics, images, or digital networking – I stand for projects that convince through profound know-how, dual state-recognized quality, and the courage to embrace new technologies.'
        },
        'pl': {
            'nav_studio': 'STUDIO',
            'nav_services': 'USŁUGI',
            'nav_portfolio': 'PORTFOLIO',
            'nav_contact': 'KONTAKT',
            'title_main': 'SOUND STUDIO HANNOVER',
            'title_sub': 'SAMPLE <span class="highlight">SOUNDDESIGN</span> BEATS',
            'title_tagline': 'WSPÓLNIE KSZTAŁTUJEMY PRZYSZŁOŚĆ',
            'powered_by': 'powered by',
            'btn_explore': 'POZNAJ MOJE PRÓBKI DŹWIĘKOWE',
            'btn_project': 'ROZPOCZNIJ PROJEKT',
            'scroll_text': 'PRZEWIŃ',
            // Generator PL
            'gen_title': 'AI-Prompt Engine',
            'gen_subtitle': 'Konfiguruj swoją wizję dźwięku dla generowania przez AI.',
            'gen_label_style': 'CHARAKTER DŹWIĘKU (STYLE)',
            'gen_label_mood': 'ATMOSFERA (MOOD)',
            'gen_opt_industrial': 'Industrial Techno',
            'gen_opt_lofi': 'Luxury Lofi',
            'gen_opt_dark': 'Cinematic Dark',
            'gen_opt_drill': 'Hard-Hitting Drill',
            'gen_opt_house': 'Melodic House',
            'gen_opt_heavy': 'Mroczny i Ciężki',
            'gen_opt_clear': 'Eteryczny i Czysty',
            'gen_opt_rebel': 'Przesterowany i Buntowniczy',
            'gen_opt_analog': 'Ciepły i Analogowy',
            'gen_btn_generate': 'GENERATE PROMPTS',
            'gen_btn_copy': 'KOPIUJ PROMPT',
            'gen_btn_play': 'ODTWÓRZ DEMO 🎧',
            'gen_copied': 'SKOPIOWANO! ✓',
            'gen_playing': 'ODTWARZANIE... 🔊',
            'port_sample_house': 'Melodic House Vibe',
            // Generator 2 PL
            'gen_title_2': 'AI-Sound Engine',
            'gen_subtitle_2': 'Generuj ekskluzywne wariacje dźwiękowe w czasie rzeczywistym.',
            'gen_btn_generate_2': 'GENERUJ DŹWIĘK',
            'gen_btn_download_2': 'POSŁUCHAJ DŹWIĘKU',
            'gen_btn_play_2': 'GRAJ DŹWIĘK 🔊',
            'gen_playing_2': 'GENEROWANIE... 🔊',
            'gen_status_ready': 'Gotowy do generowania...',
            'gen_status_composing': 'AI komponuje Twój beat...',
            'gen_status_done': 'Generowanie zakończone!',
            'gen_reset_2': 'Stwórz nowy beat',
            'gen_download_success': 'Beat zapisany pomyślnie!',
            'gen_download_start': '✔ Pobieranie rozpoczęte!',
            'work_title': 'OD WIZJI DO MISTRZA',
            'work_intro': 'Witamy w najnowocześniejszej placówce Sound Studio Hannover. Mój podwójny silnik AI został zaprojektowany, aby przełamać barierę między Twoim kreatywnym pomysłem a ostatecznym doznaniem dźwiękowym.',
            'work_body': 'Podczas gdy silnik Prompt (po lewej) tłumaczy Twoje abstrakcyjne wizje na precyzyjne instrukcje techniczne, silnik Sound (po prawej) materializuje z nich ekskluzywny, unikatowy dźwięk wspierany przez AI. To najkrótsza droga na świecie, aby nie tylko myśleć o projektowaniu dźwięku, ale natychmiast uczynić go słyszalnym.',
            'work_footer': 'Dlaczego VIR2OSE? Ponieważ łączę ludzką wiedzę z nieograniczoną mocą obliczeniową następnej generacji AI (Gemini 3 Flash). Ty dajesz iskierkę – ja dostarczam beat.',
            'work_btn': 'DOWIEDZ SIĘ WIĘCEJ O STUDIO',
            // About Me PL
            'nav_about': 'O MNIE',
            'about_title': 'O MNIE',
            'about_intro': 'Witamy serdecznie! Nazywam się Waldemar Krucinski. Moja praca zawodowa opiera się na trzech głównych filarach, które łączą rzemiosło, certyfikowaną wiedzę ekspercką (państwową) oraz pionierskiego ducha technologicznego: Produkcja muzyczna, Projektowanie mediów i Sieci informatyczne.',

            'about_col1_title': '1. Muzyka: Certyfikowana produkcja',
            'about_col1_text': 'Muzyka to dla mnie holistyczny proces na najwyższym poziomie technicznym. Jako państwowy producent muzyczny (HOFA College Diploma) posiadam głęboką wiedzę na temat całego procesu produkcji. Skupiam się na nieskazitelnym brzmieniu i ustrukturyzowanej realizacji – od pierwszej wizji po finalny master.',
            'about_col1_exp_title': 'Ekspertyza:',
            'about_col1_exp_text': 'Planowanie projektów, Songwriting, Sound Design, Nagrywanie, Edycja, Programowanie bębnów, Miks i Mastering.',
            'about_col1_cert_title': 'Dowód:',
            'about_col1_cert_text': 'Moje kwalifikacje potwierdza certyfikat państwowy i odpowiednie dyplomy.',

            'about_col2_title': '2. Media: Profesjonalny Obraz & Dźwięk',
            'about_col2_text': 'W świecie wizualnym łączę kreatywne opowiadanie historii z rzemieślniczą precyzją. Jako certyfikowany przez IHK projektant mediów obrazu i dźwięku opanowałem techniczne i projektowe standardy branży medialnej. Prowadzę projekty przez wszystkie etapy postprodukcji i gwarantuję profesjonalny workflow.',
            'about_col2_skill_title': 'Umiejętności:',
            'about_col2_skill_text': 'Planowanie na planie, Montaż klasy High-End (DaVinci Resolve Studio, Avid, FCP), Animacja, Edycja grafiki, Dubbing i kompletne produkcje filmowe.',

            'about_col3_title': '3. Sieć i IT: Innowacja & Przyszłość',
            'about_col3_text': 'Trzeci filar stanowi moją pasję do sztuki sieciowej i nowoczesnego programowania. Tutaj działam jako ambitny "Early Adopter": Moje zainteresowanie rośnie wraz z każdą innowacją. Intensywnie eksperymentuję z narzędziami Agenta AI, VS Cloud i GitHub. Fascynują mnie powiązania infrastruktury technicznej z koncepcjami przyszłości, takimi jak technologia Antigravity.',

            'about_claim': '<strong>Moje motto:</strong> Niezależnie od tego, czy chodzi o akustykę, obraz czy sieci cyfrowe – reprezentuję projekty, które przekonują szeroką wiedzą, podwójnie certyfikowaną jakością i odwagą do wdrażania nowych technologii.'
        }
    };

    function setLanguage(lang) {
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
        const activeOpt = document.getElementById(`lang-${lang}`);
        if (activeOpt) activeOpt.classList.add('active');
        setTimeout(matchTitleWidths, 50);
    }

    window.setLanguage = setLanguage;
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    // ──────────────── Match Title Widths ────────────────
    function matchTitleWidths() {
        const main = document.querySelector('.title-main');
        const sub = document.querySelector('.title-sub');
        if (!main || !sub) return;
        sub.style.letterSpacing = '0.1em';
        document.fonts.ready.then(() => {
            const mainWidth = main.getBoundingClientRect().width;
            const subNaturalWidth = sub.getBoundingClientRect().width;
            const subText = sub.textContent;
            const charCount = subText.length - 1;
            if (subNaturalWidth > 0 && charCount > 0) {
                const diff = mainWidth - subNaturalWidth;
                const currentSpacing = parseFloat(getComputedStyle(sub).letterSpacing) || 0;
                const extraPerChar = diff / charCount;
                const newSpacing = currentSpacing + extraPerChar;
                sub.style.letterSpacing = `${newSpacing}px`;
            }
        });
    }
    matchTitleWidths();
    window.addEventListener('resize', matchTitleWidths);

    // ──────────────── Wavesurfer.js Initialization ────────────────
    let wavesurfer = null;
    const waveformEl = document.getElementById('waveform');
    if (waveformEl) {
        wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#cca55a', // Gold
            progressColor: '#d4af37', // Gold Light
            cursorColor: '#fff',
            barWidth: 2,
            barRadius: 3,
            responsive: true,
            height: 60,
            normalize: true,
            partialRender: true
        });
    }

    // ──────────────── Canvases ────────────────
    const pCanvas = document.getElementById('particles-canvas');
    const pCtx = pCanvas ? pCanvas.getContext('2d') : null;
    const waveCanvas = document.getElementById('wave-canvas');
    const wCtx = waveCanvas ? waveCanvas.getContext('2d') : null;

    let width, height;
    let mouseX = 0.5, mouseY = 0.5;
    let targetMouseX = 0.5, targetMouseY = 0.5;
    let time = 0;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        if (pCanvas) {
            pCanvas.width = width;
            pCanvas.height = height;
        }
        if (waveCanvas) {
            waveCanvas.width = width;
            waveCanvas.height = 300;
        }
    }
    window.addEventListener('resize', () => {
        resize();
        initParticles();
        initWaveParticles();
    });
    resize();

    // ──────────────── 3D Particles ────────────────
    const particles = [];
    const particleCount = 50;
    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.z = Math.random() * 3 + 1;
            this.vx = (Math.random() - 0.5) * 0.12; // Slowered
            this.vy = (Math.random() - 0.5) * 0.12 - 0.02;
            this.baseRadius = Math.random() * 2 + 0.5;
            this.pulse = Math.random() * Math.PI * 2;
            const isGold = Math.random() > 0.4;
            this.r = isGold ? 212 : 160;
            this.g = isGold ? 175 : 160;
            this.b = isGold ? 55 : 160;
            this.baseAlpha = 0.12 + Math.random() * 0.18;
        }
        update() {
            this.x += this.vx / this.z;
            this.y += this.vy / this.z;
            this.pulse += 0.007; // Slowest pulse
            if (this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) this.reset();
        }
        draw() {
            const r = (this.baseRadius / this.z) * (1 + 0.3 * Math.sin(this.pulse));
            const alpha = (this.baseAlpha / this.z) * (0.8 + 0.2 * Math.sin(this.pulse));
            pCtx.beginPath();
            pCtx.arc(this.x, this.y, r, 0, Math.PI * 2);
            pCtx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
            pCtx.fill();
        }
    }

    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    }
    initParticles();

    function drawGrid() {
        if (!pCtx) return;
        mouseX += (targetMouseX - mouseX + Math.sin(time * 0.2) * 0.01) * 0.03;
        mouseY += (targetMouseY - mouseY + Math.cos(time * 0.15) * 0.008) * 0.03;
        const cx = width * (0.5 + (mouseX - 0.5) * 0.15);
        const cy = height * (0.4 + (mouseY - 0.5) * 0.1);
        const horizon = cy;
        const numH = 15;
        for (let i = 0; i < numH; i++) {
            const t = i / numH;
            const pT = Math.pow(t, 2.5);
            const y = horizon + pT * (height - horizon + 150);
            const alpha = (1 - t) * 0.05;
            pCtx.beginPath();
            pCtx.moveTo(0, y);
            pCtx.lineTo(width, y);
            pCtx.strokeStyle = `rgba(197, 165, 90, ${alpha})`;
            pCtx.lineWidth = 0.5 + (1 - t) * 0.7;
            pCtx.stroke();
        }
    }

    // ──────────────── Liquid Gold Wave ────────────────
    const waveParticles = [];
    const waveParticleCount = 60;
    class WaveParticle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * width;
            this.y = 220 + Math.random() * 80;
            this.vx = (Math.random() - 0.5) * 0.3; // Glacial particle speed
            this.vy = -Math.random() * 0.15;
            this.size = Math.random() * 1.0 + 0.4;
            this.alpha = Math.random() * 0.3 + 0.1;
            this.life = Math.random() * 0.5 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 0.0015;
            if (this.life <= 0 || this.y < 120) this.reset();
        }
        draw() {
            wCtx.beginPath();
            wCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            wCtx.fillStyle = `rgba(232, 213, 160, ${this.alpha * this.life})`;
            wCtx.fill();
        }
    }

    function initWaveParticles() {
        waveParticles.length = 0;
        for (let i = 0; i < waveParticleCount; i++) waveParticles.push(new WaveParticle());
    }
    initWaveParticles();

    function drawLiquidWave() {
        if (!wCtx) return;
        wCtx.clearRect(0, 0, width, 300);

        const centerY = 235; // Lowered further for subtle horizon feel
        const layers = [
            { amp: 35, freq: 0.0015, speed: 0.12, color: 'rgba(197, 165, 90, 0.18)', ribbons: 6 },
            { amp: 20, freq: 0.003, speed: -0.08, color: 'rgba(232, 213, 160, 0.12)', ribbons: 4 },
            { amp: 45, freq: 0.001, speed: 0.05, color: 'rgba(138, 115, 64, 0.12)', ribbons: 5 },
            { amp: 15, freq: 0.006, speed: 0.18, color: 'rgba(255, 255, 255, 0.06)', ribbons: 3 }
        ];

        layers.forEach((l, i) => {
            const timeOffset = i * 25;
            for (let r = 0; r < l.ribbons; r++) {
                wCtx.beginPath();
                wCtx.lineWidth = 0.3 + Math.random() * 0.5;
                wCtx.strokeStyle = l.color;

                const ribbonOffset = r * 8;
                wCtx.moveTo(0, centerY);

                for (let x = 0; x <= width; x += 20) {
                    const noise = Math.sin(x * 0.01 + time * 0.4 + r) * 1.5;
                    const y = centerY +
                        Math.sin(x * l.freq + time * l.speed + ribbonOffset + timeOffset) * l.amp +
                        Math.cos(x * 0.004 + time * 0.1) * (l.amp / 2) + noise;

                    if (x === 0) wCtx.moveTo(x, y);
                    else wCtx.lineTo(x, y);
                }
                wCtx.stroke();
            }
        });

        waveParticles.forEach(p => {
            p.update();
            p.draw();
        });
    }

    function animate() {
        time += 0.002; // Glacial global increment
        if (pCtx) {
            pCtx.clearRect(0, 0, width, height);
            drawGrid();
            particles.forEach(p => { p.update(); p.draw(); });
        }
        drawLiquidWave();

        const ux = (mouseX - 0.5) * 2;
        const uy = (mouseY - 0.5) * 2;
        const hero = document.querySelector('.hero-content');
        if (hero) hero.style.transform = `translate(${ux * 10}px, ${uy * 6}px)`;

        requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX / width;
        targetMouseY = e.clientY / height;
        document.documentElement.style.setProperty('--x', e.clientX + 'px');
        document.documentElement.style.setProperty('--y', e.clientY + 'px');
    });

    // ──────────────── AI Prompt Engine Logic ────────────────
    const genreAudioMap = {
        'Industrial Techno': [
            'sounds/audio gen/Industrial Techno/VIR2OSE Studios_ Techno_Dark&Heavy.wav',
            'sounds/audio gen/Industrial Techno/VIR2OSE Studios_ Techno_Warm & Analog.wav',
            'sounds/audio gen/Industrial Techno/VIR2OSE Studios_Techno_Distorted & Rebellious.wav',
            'sounds/audio gen/Industrial Techno/VIR2OSE Studios_Techno_Ethereal & Clear.wav'
        ],
        'Luxury Chill-Hop & Jazz': [
            'sounds/audio gen/Luxury Lofi/VIR2OSE Studios_ Luxury Lofi_Dark & Heavy.wav',
            'sounds/audio gen/Luxury Lofi/VIR2OSE Studios_ Luxury Lofi_Distorted & Rebellious.wav',
            'sounds/audio gen/Luxury Lofi/VIR2OSE Studios_ Luxury Lofi_Ethereal & Clear.wav',
            'sounds/audio gen/Luxury Lofi/VIR2OSE Studios_ Luxury Lofi_Warm & Analog.wav'
        ],
        'Dark Cinematic Orchestral': [
            'sounds/audio gen/Cinematc Dark/VIR2OSE Studios_ Cinematic Dark_Dark & Heavy.wav',
            'sounds/audio gen/Cinematc Dark/VIR2OSE Studios_ Cinematic Dark_Distorted & Rebellious.wav',
            'sounds/audio gen/Cinematc Dark/VIR2OSE Studios_ Cinematic Dark_Ethereal & Clear.wav',
            'sounds/audio gen/Cinematc Dark/VIR2OSE Studios_ Cinematic Dark_Warm & Analog.wav'
        ],
        'Modern Hard-Hitting Drill': [
            'sounds/audio gen/Hard-Hitting Drill/VIR2OSE Studios_ Drill_Dark & Heavy.wav',
            'sounds/audio gen/Hard-Hitting Drill/VIR2OSE Studios_ Drill_Distorted & Rebellious.wav',
            'sounds/audio gen/Hard-Hitting Drill/VIR2OSE Studios_ Drill_Ethereal & Clear.wav',
            'sounds/audio gen/Hard-Hitting Drill/VIR2OSE Studios_ Drill_Warm & Analog.wav'
        ],
        'Hypnotic Melodic House': [
            'sounds/audio gen/Melodic House/VIR2OSE Studios_ Melodic_House_Dark & Heavy.wav',
            'sounds/audio gen/Melodic House/VIR2OSE Studios_ Melodic_House_Distroted & Rebellious.wav',
            'sounds/audio gen/Melodic House/VIR2OSE Studios_ Melodic_House_Ethereal & Clear.wav',
            'sounds/audio gen/Melodic House/VIR2OSE Studios_ Melodic_House_Warm & Analog.wav'
        ]
    };

    function generatePrompt() {
        const genreEl = document.getElementById('genre');
        const vibeEl = document.getElementById('vibe');
        const resultBox = document.getElementById('result-box');
        const promptEl = document.getElementById('generated-prompt');

        if (!genreEl || !vibeEl || !resultBox || !promptEl) return;

        const genreVal = genreEl.value;
        const vibe = vibeEl.value;

        let bpm = "120 BPM";
        let instruments = "analog synths, crisp drum machines";
        let textures = "balanced mix, clean digital output";

        if (genreVal.includes("Techno")) {
            bpm = "130 BPM";
            instruments = "heavy distorted kick drum, metallic percussion, aggressive 909 hi-hats";
            textures = "sub-bass focus, gritty analog saturation, industrial grit";
        } else if (genreVal.includes("Lofi") || genreVal.includes("Jazz") || genreVal.includes("Chill")) {
            bpm = "85 BPM";
            instruments = "dusty upright piano, humanized swung drum break, deep acoustic standup bass";
            textures = "12-bit sampler warmth, tape wow and flutter, subtle vinyl crackle, lo-fi saturation";
        } else if (genreVal.includes("Cinematic")) {
            bpm = "80 BPM";
            instruments = "booming taiko ensembles, atonal string risers, granular synth drones";
            textures = "massive dynamic range, expansive stereo imaging, hybrid synthesis, deep low-end rumble";
        } else if (genreVal.includes("Drill")) {
            bpm = "142 BPM";
            instruments = "gliding 808 sub-bass, rapid-fire hi-hat rolls, syncopated hard snares, haunting choir chops";
            textures = "tight low end, aggressive transients, subtle digital clipping";
        } else if (genreVal.includes("House")) {
            bpm = "124 BPM";
            instruments = "deep Moog bassline, classic 909 claps, lush polyphonic pad chords";
            textures = "heavy sidechain pumping, analog chorus, crisp high-end sheen";
        }

        const base = `${genreVal}, ${bpm}, ${instruments}, ${vibe.toLowerCase()} atmosphere, ${textures}, high fidelity, latent-diffusion optimized`;

        /* 
        // Beispiel für zukünftigen API Call (Riffusion/Replicate)
        async function generateRealSound(prompt) {
            showLoadingSpinner();
            try {
                const audioUrl = await callAudioModelAPI(prompt); 
                const player = document.getElementById('audio-player');
                player.src = audioUrl;
                player.style.display = 'block';
            } catch(e) {
                console.error("API Error", e);
            }
            hideLoadingSpinner();
        }
        */

        promptEl.innerText = base;
        resultBox.style.display = 'block';
        setTimeout(() => {
            resultBox.classList.add('result-box-show');
        }, 10);

        // Reset right-side engine state for fresh generation
        const rightEngine = document.getElementById('prompt-generator-container-2');
        const resultBox2 = document.getElementById('result-box-2');
        const statusText2 = document.getElementById('status-display') ? document.getElementById('status-display').querySelector('p') : null;

        if (resultBox2) {
            resultBox2.style.display = 'none';
            resultBox2.classList.remove('result-box-show');
        }
        if (statusText2) {
            statusText2.innerText = translations[currentLang]['gen_status_ready'] || 'Bereit...';
        }

        if (rightEngine) {
            rightEngine.classList.remove('engine-pulse');
            void rightEngine.offsetWidth; // Force reflow for animation restart
            rightEngine.classList.add('engine-pulse');
        }

        // Auto-play preview (force start)
        // playDemo(true); 
    }

    function playDemo(forcePlay = false) {
        const genreEl = document.getElementById('genre');
        if (!genreEl) return;
        const genreVal = genreEl.value;
        const audio = document.getElementById('preview-audio');
        const playBtn = document.querySelector('.btn-play');
        const currentLang = localStorage.getItem('lang') || 'en';

        const genreFiles = genreAudioMap[genreVal];
        if (!genreFiles) return;

        // If it's already playing and we DON'T force it, toggle off
        if (!audio.paused && !forcePlay) {
            audio.pause();
            playBtn.innerHTML = translations[currentLang]['gen_btn_play'] || 'PLAY DEMO 🎧';
            playBtn.classList.remove('playing');
            return;
        }

        // Determine target file (random if array, else string)
        const targetSrc = Array.isArray(genreFiles)
            ? genreFiles[Math.floor(Math.random() * genreFiles.length)]
            : genreFiles;

        audio.src = targetSrc;
        audio.loop = true; // SEAMLESS LOOPING ENABLED

        audio.play().then(() => {
            playBtn.innerHTML = translations[currentLang]['gen_playing'] || 'PLAYING... 🔊';
            playBtn.classList.add('playing');
        }).catch(e => {
            console.error("Audio playback error:", e);
            // Handle browser autoplay restriction/interaction requirements
        });
    }

    function copyPrompt() {
        const promptText = document.getElementById('generated-prompt').innerText;
        const currentLang = localStorage.getItem('lang') || 'en';
        const successMsg = translations[currentLang]['gen_copied'] || 'COPIED! ✓';

        navigator.clipboard.writeText(promptText).then(() => {
            const copyBtn = document.querySelector('.btn-copy');
            const originalText = copyBtn.innerText;
            copyBtn.innerText = successMsg;
            copyBtn.style.background = 'var(--gold)';
            copyBtn.style.color = '#000';

            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.background = '';
                copyBtn.style.color = '';
            }, 2000);
        });
    }

    // ──────────────── AI Sound Engine 2 Logic (Mirror) ────────────────
    function generatePrompt2() {
        const genreEl = document.getElementById('genre-2');
        const vibeEl = document.getElementById('vibe-2');
        const resultBox = document.getElementById('result-box-2');
        const promptEl = document.getElementById('generated-prompt-2');

        if (!genreEl || !vibeEl || !resultBox || !promptEl) return;

        const genreVal = genreEl.value;
        const vibe = vibeEl.value;

        const base = `Audio Variation Engine [v2.0], ${genreVal} logic, ${vibe} texture, optimized for VIR2OSE spatial audio. Seed: ${Math.floor(Math.random() * 1000000)}`;

        promptEl.innerText = base;
        resultBox.style.display = 'block';

        // playDemo2(true); // Disabled as Play button is removed
    }

    function playDemo2(forcePlay = false) {
        const genreEl = document.getElementById('genre-2');
        if (!genreEl) return;
        const genreVal = genreEl.value;
        const audio = document.getElementById('preview-audio');
        const playBtn = document.querySelector('.btn-play-2');
        const currentLang = localStorage.getItem('lang') || 'en';

        const genreFiles = genreAudioMap[genreVal];
        if (!genreFiles) return;

        if (!audio.paused && !forcePlay) {
            audio.pause();
            if (playBtn) playBtn.innerHTML = translations[currentLang]['gen_btn_play_2'] || 'PLAY SOUND 🔊';
            return;
        }

        const targetSrc = Array.isArray(genreFiles)
            ? genreFiles[Math.floor(Math.random() * genreFiles.length)]
            : genreFiles;

        audio.src = targetSrc;
        audio.loop = true;

        audio.play().then(() => {
            if (playBtn) playBtn.innerHTML = translations[currentLang]['gen_playing_2'] || 'GENERATING... 🔊';
        }).catch(e => console.error("Audio playback error:", e));
    }

    function copyPrompt2() {
        const promptText = document.getElementById('generated-prompt-2').innerText;
        const currentLang = localStorage.getItem('lang') || 'en';
        const successMsg = translations[currentLang]['gen_copied'] || 'COPIED! ✓';

        navigator.clipboard.writeText(promptText).then(() => {
            const copyBtn = document.querySelector('.btn-copy-2');
            if (copyBtn) {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = successMsg;
                copyBtn.style.background = 'var(--gold)';
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            }
        });
    }

    // ──────────────── Sound Portfolio Logic ────────────────
    let currentCard = null;

    function playPortfolioSample(path, card) {
        const audio = document.getElementById('preview-audio');

        // If the same card is clicked and audio is playing, pause it
        if (currentCard === card && !audio.paused) {
            audio.pause();
            card.classList.remove('playing');
            return;
        }

        // If another sample is playing, stop it and reset its card
        if (currentCard) {
            currentCard.classList.remove('playing');
        }

        // Stop the generator audio if it was playing
        audio.pause();
        audio.loop = false;

        audio.src = path;
        currentCard = card;

        audio.play().then(() => {
            card.classList.add('playing');

            audio.onended = () => {
                card.classList.remove('playing');
            };
        }).catch(e => console.error("Portfolio playback failed:", e));
    }

    window.generatePrompt = generatePrompt;
    window.playDemo = playDemo;
    window.copyPrompt = copyPrompt;

    window.generatePrompt2 = generatePrompt2;
    window.playDemo2 = playDemo2;
    window.copyPrompt2 = copyPrompt2;

    // Smooth scrolling for the EXPLORE button (only if target exists on page)
    const exploreBtn = document.querySelector('a[href="#samples"]');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for the header
                    behavior: 'smooth'
                });
            }
        });
    }

    const copyBtn = document.querySelector('.btn-copy');
    if (copyBtn) window.copyPrompt = copyPrompt;

    window.playPortfolioSample = playPortfolioSample;

    // Configuration Toggle for Future API Integration
    const CONFIG = {
        USE_REAL_API: false, // Set to true when the VIR2OSE API Key is available
        API_ENDPOINT: 'https://api.example-audio-model.com/v1/generate' // Placeholder
    };

    async function startSoundGeneration() {
        const promptFromLeft = document.getElementById('generated-prompt').innerText;
        const statusDisplay = document.getElementById('status-display');
        const statusText = statusDisplay.querySelector('p');
        const waveformContainer = document.getElementById('waveform-container');
        const resultBox2 = document.getElementById('result-box-2');
        const currentLang = localStorage.getItem('lang') || 'en';
        const rightEngine = document.getElementById('prompt-generator-container-2');

        if (!promptFromLeft || promptFromLeft.trim() === "") {
            const errorMsg = currentLang === 'de' ? "Bitte generiere zuerst einen Prompt links!" :
                (currentLang === 'pl' ? "Najpierw wygeneruj prompt po lewej!" : "Please generate a prompt on the left first!");
            alert(errorMsg);
            return;
        }

        // 1. Trigger Pulse & Show processing state
        if (rightEngine) {
            rightEngine.classList.remove('engine-pulse');
            void rightEngine.offsetWidth; // Force reflow
            rightEngine.classList.add('engine-pulse');
        }

        statusDisplay.classList.add('status-active');
        statusText.innerText = translations[currentLang]['gen_status_composing'] || "KI komponiert deinen Beat...";
        waveformContainer.style.display = 'none';

        // Hide result box and reset button state
        resultBox2.style.display = 'none';
        resultBox2.classList.remove('result-box-show');
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) downloadBtn.classList.remove('btn-breathe');

        console.log("Input Prompt:", promptFromLeft);

        if (CONFIG.USE_REAL_API) {
            // ──────────────── REAL API INTEGRATION BLOCK ────────────────
            console.log("Calling external Audio AI API...");
            try {
                // Placeholder for future fetch logic:
                // const response = await fetch(CONFIG.API_ENDPOINT, {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_KEY' },
                //     body: JSON.stringify({ prompt: promptFromLeft })
                // });
                // const data = await response.json();
                // const generatedAudioUrl = data.audio_url; 

                // For now, simulate a fast return if toggled by mistake
                await new Promise(resolve => setTimeout(resolve, 2000));
                throw new Error("Real API not yet configured. Falling back to simulation.");

            } catch (error) {
                console.warn(error.message);
                // Fallback handled below if needed, or handle error state
            }
        }

        // ──────────────── SIMULATION BLOCK (Fallback/Current) ────────────────
        console.log("Starting 5-Second Bridge Simulation...");
        // 2. Simulate Production Delay (Exactly 5 Seconds)
        setTimeout(() => {
            statusDisplay.classList.remove('status-active');
            statusText.innerText = translations[currentLang]['gen_status_done'] || "Generierung abgeschlossen!";

            // Show result box with fade-in effect
            resultBox2.style.display = 'block';
            setTimeout(() => {
                resultBox2.classList.add('result-box-show');
            }, 10);

            waveformContainer.style.display = 'block';

            // Build the array of new available files in the audio gen folder
            const technoFiles = [
                'sounds/audio gen/Industrial Techno/VIR2OSE Studios_ Techno_Dark&Heavy.wav',
                'sounds/audio gen/Industrial Techno/VIR2OSE Studios_ Techno_Warm & Analog.wav',
                'sounds/audio gen/Industrial Techno/VIR2OSE Studios_Techno_Distorted & Rebellious.wav',
                'sounds/audio gen/Industrial Techno/VIR2OSE Studios_Techno_Ethereal & Clear.wav'
            ];

            const houseFiles = [
                'sounds/audio gen/Melodic House/VIR2OSE Studios_ Melodic_House_Dark & Heavy.wav',
                'sounds/audio gen/Melodic House/VIR2OSE Studios_ Melodic_House_Distroted & Rebellious.wav',
                'sounds/audio gen/Melodic House/VIR2OSE Studios_ Melodic_House_Ethereal & Clear.wav',
                'sounds/audio gen/Melodic House/VIR2OSE Studios_ Melodic_House_Warm & Analog.wav'
            ];

            const lofiFiles = [
                'sounds/audio gen/Luxury Lofi/VIR2OSE Studios_ Luxury Lofi_Dark & Heavy.wav',
                'sounds/audio gen/Luxury Lofi/VIR2OSE Studios_ Luxury Lofi_Distorted & Rebellious.wav',
                'sounds/audio gen/Luxury Lofi/VIR2OSE Studios_ Luxury Lofi_Ethereal & Clear.wav',
                'sounds/audio gen/Luxury Lofi/VIR2OSE Studios_ Luxury Lofi_Warm & Analog.wav'
            ];

            const drillFiles = [
                'sounds/audio gen/Hard-Hitting Drill/VIR2OSE Studios_ Drill_Dark & Heavy.wav',
                'sounds/audio gen/Hard-Hitting Drill/VIR2OSE Studios_ Drill_Distorted & Rebellious.wav',
                'sounds/audio gen/Hard-Hitting Drill/VIR2OSE Studios_ Drill_Ethereal & Clear.wav',
                'sounds/audio gen/Hard-Hitting Drill/VIR2OSE Studios_ Drill_Warm & Analog.wav'
            ];

            const cinematicFiles = [
                'sounds/audio gen/Cinematc Dark/VIR2OSE Studios_ Cinematic Dark_Dark & Heavy.wav',
                'sounds/audio gen/Cinematc Dark/VIR2OSE Studios_ Cinematic Dark_Distorted & Rebellious.wav',
                'sounds/audio gen/Cinematc Dark/VIR2OSE Studios_ Cinematic Dark_Ethereal & Clear.wav',
                'sounds/audio gen/Cinematc Dark/VIR2OSE Studios_ Cinematic Dark_Warm & Analog.wav'
            ];

            // Select a demo file based on prompt content
            let demoFile = '';

            const p = promptFromLeft.toLowerCase();
            if (p.includes("house")) demoFile = houseFiles[Math.floor(Math.random() * houseFiles.length)];
            else if (p.includes("lofi") || p.includes("chill") || p.includes("jazz")) demoFile = lofiFiles[Math.floor(Math.random() * lofiFiles.length)];
            else if (p.includes("drill")) demoFile = drillFiles[Math.floor(Math.random() * drillFiles.length)];
            else if (p.includes("cinematic")) demoFile = cinematicFiles[Math.floor(Math.random() * cinematicFiles.length)];
            else demoFile = technoFiles[Math.floor(Math.random() * technoFiles.length)]; // Default to random techno file

            if (wavesurfer) {
                wavesurfer.load(demoFile);
                wavesurfer.once('ready', () => {
                    wavesurfer.play();
                });
            }

            // Update Download link & Activate Button
            currentSoundURL = demoFile;
            const downloadBtn = document.getElementById('download-btn');
            if (downloadBtn) {
                downloadBtn.href = currentSoundURL;
                // Dynamically name the download file based on the selected file path
                const fileName = currentSoundURL.split('/').pop();
                downloadBtn.download = fileName;
                downloadBtn.classList.add('btn-breathe'); // Pulse effect
            }

            // Sync simulation link
            const promptOutput2 = document.getElementById('generated-prompt-2');
            if (promptOutput2) {
                promptOutput2.innerText = `VIR2OSE Engine URL: /${demoFile}`;
            }

        }, 5000);
    }

    function showSuccessMessage() {
        const currentLang = localStorage.getItem('lang') || 'en';
        const toast = document.getElementById('download-toast');
        const toastText = toast.querySelector('[data-i18n="gen_download_success"]');

        if (toastText) {
            toastText.innerText = translations[currentLang]['gen_download_start'] || '✔ Download gestartet!';
        }

        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    function resetEngine2(e) {
        if (e) e.preventDefault();
        const currentLang = localStorage.getItem('lang') || 'en';

        // Hide result box
        const resultBox2 = document.getElementById('result-box-2');
        if (resultBox2) {
            resultBox2.style.display = 'none';
            resultBox2.classList.remove('result-box-show');
        }

        // Reset status
        const statusDisplay = document.getElementById('status-display');
        const statusText = statusDisplay.querySelector('p');
        statusDisplay.classList.remove('status-active');
        statusText.innerText = translations[currentLang]['gen_status_ready'] || 'Bereit...';

        // Hide waveform
        const waveformContainer = document.getElementById('waveform-container');
        if (waveformContainer) waveformContainer.style.display = 'none';

        // Reset prompt link variable
        currentSoundURL = '';
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.href = '#';
            downloadBtn.classList.remove('btn-breathe');
        }
    }

    // Export to global scope
    window.startSoundGeneration = startSoundGeneration;
    window.showSuccessMessage = showSuccessMessage;
    window.resetEngine2 = resetEngine2;
});
