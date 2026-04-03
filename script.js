// ──────────────── Service Worker Registration (PWA) ────────────────
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

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
            'btn_explore': 'GENRE OVERVIEW',
            'btn_project': 'LYRICS & NOTIZEN SCHREIBEN',
            'scroll_text': 'SCROLLEN',
            // Portfolio
            'port_title': 'GENRE OVERVIEW',
            'port_subtitle': 'Entdecke exklusive Preview-Sounds aus allen 15 Genres.',
            // Newsletter
            'nl_title': 'STAY IN THE LOOP',
            'nl_subtitle': 'Sichere dir exklusive Sound-Packs, Studio-Updates und Insider-Tipps direkt in dein Postfach.',
            'nl_btn': 'ABONNIEREN',
            'nl_privacy_text': 'Ich stimme zu, dass meine Daten verarbeitet werden. (<a href="privacy.html" target="_blank" class="gold-link">Datenschutz</a>)',
            'nl_success': 'Genial! Danke für deine Anmeldung ✨',
            'nl_error': 'Es gab ein Problem. Bitte versuche es noch einmal.',
            // Notepad DE
            'note_hint': 'Schreibe deine neuen Lyrics...',
            'note_btn_download': 'Als .txt Speichern',
            // Generator DE
            'gen_title': 'AI-PROMPT ENGINE',
            'gen_subtitle': 'Konfiguriere deine Klang-Vision für die KI-Generierung.',
            'gen_label_style': 'KLANG-CHARAKTER (STYLE)',
            'gen_label_mood': 'ATMOSPHÄRE (MOOD)',
            'gen_label_tempo': 'TEMPO (BPM)',
            'gen_label_tonart': 'TONART (KEY)',
            'gen_label_takt': 'TAKT (TIME)',
            'gen_btn_apply': 'ÜBERNEHMEN & WEITER',
            'gen_opt_industrial': 'Cyberpunk',
            'gen_opt_lofi': 'Lofi Hiphop',
            'gen_opt_dark': 'Cinematic',
            'gen_opt_drill': 'Drill',
            'gen_opt_house': 'House',
            'gen_opt_pop': 'POP',
            'gen_opt_rock': 'Rock',
            'gen_opt_reggaeton': 'Reggaeton',
            'gen_opt_hiphop': 'Hip-Hop',
            'gen_opt_meditation': 'Meditation',
            'gen_opt_metal': 'Metal',
            'gen_opt_edm': 'EDM',
            'gen_opt_soul': 'Soul',
            'gen_opt_reggae': 'Reggae',
            'gen_opt_kpop': 'K-POP',
            'gen_opt_heavy': 'Düster & Schwer',
            'gen_opt_clear': 'Ätherisch & Klar',
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
            'work_title': 'VON DER VISION ZUM ZIEL',
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

            'about_claim': '<strong>Mein Anspruch:</strong> Ob Akustik, Bild oder digitale Vernetzung – ich stehe für Projekte, die durch fundiertes Know-how, zweifach staatlich anerkannte Qualität und den Mut zu neuen Technologien überzeugen.',
            // Services DE
            'services_title': 'SERVICES',
            'services_intro': 'Durch meine Doppel-Qualifikation als IHK-Mediengestalter und Staatlich geprüfter Musikproduzent garantiere ich dir einen Workflow, der Kreativität mit technischer Perfektion vereint. Jedes Projekt wird individuell betreut und erhält das passende Finishing.',
            'srv_card1_title': 'Das "Studio-Experience" Special',
            'srv_card1_desc': 'Du hast dir einen Beat oder ein Playback generiert und suchst jetzt nach dem entscheidenden Qualitätssprung? Komm direkt zu mir ins Studio.',
            'srv_card1_item1': '<strong>Vocal-Recording:</strong> Nimm deine Stimme in professioneller Akustik-Umgebung auf.',
            'srv_card1_item2': '<strong>Full-Service-Production:</strong> Ich übernehme das komplette Handwerk – von präzisem Editing über kreatives Mixing bis zum finalen, druckvollen Mastering.',
            'srv_card1_item3': '<strong>Das Ergebnis:</strong> Ein fertiger Song oder Soundtrack, der radiotauglich ist und professionellen Standards entspricht.',
            'srv_card1_footer': 'Egal ob aus der Region oder mit Anreise – buche deinen persönlichen Session-Tag und veredle dein Projekt.',
            'srv_card2_title': 'Musikproduktion & Engineering',
            'srv_card2_desc': 'Als staatlich geprüfter Musikproduzent begleite ich dein Projekt mit technischer Exzellenz:',
            'srv_card2_item1': '<strong>Recording & Editing:</strong> Saubere Aufnahmen und perfektes Timing für jedes Instrument.',
            'srv_card2_item2': '<strong>Drum-Programming:</strong> Individuelle und druckvolle Beats, die deinem Track das nötige Fundament geben.',
            'srv_card2_item3': '<strong>Mixing & Mastering:</strong> Ein transparenter, balancierter Mix und ein finales Mastering, das auf allen Endgeräten überzeugt.',
            'srv_card3_title': 'Sounddesign für Film & Video',
            'srv_card3_desc': 'Verleihe deinem visuellen Content die passende akustische Tiefe:',
            'srv_card3_item1': '<strong>Film-Sounddesign:</strong> Maßgeschneiderte Sound-Landschaften und Atmosphären für Filmstreifen oder Werbevideos.',
            'srv_card3_item2': '<strong>Synchronisation:</strong> Präzise Anpassung von Ton und Bild für eine immersive Wirkung.',
            'srv_card4_title': 'Podcasting & Voiceover',
            'srv_card4_desc': 'Professioneller Sound für deine Botschaft:',
            'srv_card4_item1': '<strong>Audio-Postproduktion:</strong> Ich sorge für klare Stimmen, entfernen Störgeräusche und optimieren den Flow deiner Podcast-Episoden.',
            // Contact DE
            'contact_title': 'CONTACT',
            'contact_intro': 'Lass uns gemeinsam dein nächstes Audio-Projekt verwirklichen. Schreibe mir eine Nachricht oder buche direkt eine Session im Studio.',
            'contact_info_title': 'DIRECT CONTACT',
            'contact_info_desc': 'Ich freue mich über jede Anfrage und melde mich zeitnah zurück.',
            'contact_info_response_time': 'Ich melde mich in der Regel innerhalb von 24 Stunden bei dir.',
            'contact_form_title': 'SEND A MESSAGE',
            'contact_label_name': 'NAME',
            'contact_label_email': 'EMAIL',
            'contact_label_subject': 'BETREFF',
            'contact_opt_prod': 'Musikproduktion / Beatmaking',
            'contact_opt_mix': 'Mixing & Mastering',
            'contact_opt_video': 'Video Sounddesign',
            'contact_opt_other': 'Sonstige Anfrage',
            'contact_label_msg': 'NACHRICHT',
            'contact_btn_send': 'NACHRICHT SENDEN',
            // Footer DE
            'footer_copyright': '© Waldemar Krucinski Hannover 2026',
            'footer_privacy': 'Datenschutz & Impressum'
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
            'btn_explore': 'GENRE OVERVIEW',
            'btn_project': 'WRITE LYRICS & NOTES',
            'scroll_text': 'SCROLL',
            // Portfolio
            'port_title': 'GENRE OVERVIEW',
            'port_subtitle': 'Discover exclusive preview sounds from all 15 genres.',
            // Newsletter
            'nl_title': 'STAY IN THE LOOP',
            'nl_subtitle': 'Get exclusive sound packs, studio updates, and insider tips delivered straight to your inbox.',
            'nl_btn': 'SUBSCRIBE',
            'nl_privacy_text': 'I consent to the processing of my data. (<a href="privacy.html" target="_blank" class="gold-link">Privacy Policy</a>)',
            'nl_success': 'Awesome! Thanks for subscribing ✨',
            'nl_error': 'There was a problem. Please try again.',
            // Notepad EN
            'note_hint': 'Write your new lyrics...',
            'note_btn_download': 'Save as .txt',
            // Generator EN
            'gen_title': 'AI-Prompt Engine',
            'gen_subtitle': 'Configure your sound vision for AI generation.',
            'gen_label_style': 'SOUND CHARACTER (STYLE)',
            'gen_label_mood': 'ATMOSPHERE (MOOD)',
            'gen_label_tempo': 'TEMPO (BPM)',
            'gen_label_tonart': 'KEY (TONALITY)',
            'gen_label_takt': 'TIME SIGNATURE',
            'gen_btn_apply': 'APPLY & CONTINUE',
            'gen_opt_industrial': 'Cyberpunk',
            'gen_opt_lofi': 'Lofi Hiphop',
            'gen_opt_dark': 'Cinematic',
            'gen_opt_drill': 'Drill',
            'gen_opt_house': 'House',
            'gen_opt_pop': 'POP',
            'gen_opt_rock': 'Rock',
            'gen_opt_reggaeton': 'Reggaeton',
            'gen_opt_hiphop': 'Hip-Hop',
            'gen_opt_meditation': 'Meditation',
            'gen_opt_metal': 'Metal',
            'gen_opt_edm': 'EDM',
            'gen_opt_soul': 'Soul',
            'gen_opt_reggae': 'Reggae',
            'gen_opt_kpop': 'K-POP',
            'gen_opt_heavy': 'Dark & Heavy',
            'gen_opt_clear': 'Ethereal & Clear',
            'gen_opt_analog': 'Warm & Analog',
            'gen_btn_generate': 'GENERATE PROMPTS',
            'gen_btn_copy': 'COPY PROMPT',
            'gen_btn_play': 'PLAY DEMO 🎧',
            'gen_copied': 'COPIED! ✓',
            'gen_playing': 'PLAYING... 🔊',
            'port_sample_house': 'Melodic House Vibe',
            'gen_btn_generate_1': 'GENERATE PROMPTS',
            // Generator 2 EN
            'gen_title_2': 'AI-Sound Engine',
            'gen_subtitle_2': 'Generate exclusive sound variations in real-time.',
            'gen_btn_generate_2': 'GENERATE SOUND',
            'gen_listen_2': 'LISTEN TO SOUND',
            'gen_download_2': 'DOWNLOAD SOUND',
            'gen_btn_play_2': 'PLAY SOUND 🔊',
            'gen_playing_2': 'GENERATING... 🔊',
            'gen_status_ready': 'Ready for generation...',
            'gen_status_composing': 'AI is composing your beat...',
            'gen_status_done': 'Generation complete!',
            'gen_reset_2': 'Create new beat',
            'gen_download_success': 'Beat saved successfully!',
            'gen_download_start': '✔ Download started!',
            'work_title': 'FROM VISION TO THE GOAL',
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

            'about_claim': '<strong>My Claim:</strong> Whether acoustics, images, or digital networking – I stand for projects that convince through profound know-how, dual state-recognized quality, and the courage to embrace new technologies.',
            // Services EN
            'services_title': 'SERVICES',
            'services_intro': 'With my dual qualification as an IHK Media Designer and State-certified Music Producer, I guarantee a workflow that combines creativity with technical perfection. Each project is handled individually and receives the appropriate finishing.',
            'srv_card1_title': 'The "Studio Experience" Special',
            'srv_card1_desc': 'You have generated a beat or playback and are now looking for the decisive leap in quality? Come directly to my studio.',
            'srv_card1_item1': '<strong>Vocal Recording:</strong> Record your voice in a professional acoustic environment.',
            'srv_card1_item2': '<strong>Full-Service Production:</strong> I handle the complete craft – from precise editing and creative mixing to the final, punchy mastering.',
            'srv_card1_item3': '<strong>The Result:</strong> A finished song or soundtrack that is radio-ready and meets professional standards.',
            'srv_card1_footer': 'Whether from the region or traveling – book your personal session day and refine your project.',
            'srv_card2_title': 'Music Production & Engineering',
            'srv_card2_desc': 'As a state-certified Music Producer, I accompany your project with technical excellence:',
            'srv_card2_item1': '<strong>Recording & Editing:</strong> Clean recordings and perfect timing for every instrument.',
            'srv_card2_item2': '<strong>Drum Programming:</strong> Individual and punchy beats that give your track the necessary foundation.',
            'srv_card2_item3': '<strong>Mixing & Mastering:</strong> A transparent, balanced mix and an impactful final master that convinces on all devices.',
            'srv_card3_title': 'Sound Design for Film & Video',
            'srv_card3_desc': 'Give your visual content the appropriate acoustic depth:',
            'srv_card3_item1': '<strong>Film Sound Design:</strong> Tailor-made soundscapes and atmospheres for films or commercials.',
            'srv_card3_item2': '<strong>Dubbing:</strong> Precise synchronization of sound and image for an immersive effect.',
            'srv_card4_title': 'Podcasting & Voiceover',
            'srv_card4_desc': 'Professional sound for your message:',
            'srv_card4_item1': '<strong>Audio Post-production:</strong> I ensure clear voices, remove background noise, and optimize the flow of your podcast episodes.',
            // Contact EN
            'contact_title': 'CONTACT',
            'contact_intro': 'Let\'s realize your next audio project together. Send me a message or book a session directly in the studio.',
            'contact_info_title': 'DIRECT CONTACT',
            'contact_info_desc': 'I look forward to every inquiry and will get back to you promptly.',
            'contact_info_response_time': 'I usually respond within 24 hours.',
            'contact_form_title': 'SEND A MESSAGE',
            'contact_label_name': 'NAME',
            'contact_label_email': 'EMAIL',
            'contact_label_subject': 'SUBJECT',
            'contact_opt_prod': 'Music Production / Beatmaking',
            'contact_opt_mix': 'Mixing & Mastering',
            'contact_opt_video': 'Video Sound Design',
            'contact_opt_other': 'Other Inquiry',
            'contact_label_msg': 'MESSAGE',
            'contact_btn_send': 'SEND MESSAGE',
            // Footer EN
            'footer_copyright': '© Waldemar Krucinski Hannover 2026',
            'footer_privacy': 'Privacy Policy & Legal Notice'
        },
        'es': {
            'nav_studio': 'ESTUDIO',
            'nav_services': 'SERVICIOS',
            'nav_portfolio': 'PORTAFOLIO',
            'nav_contact': 'CONTACTO',
            'title_main': 'SOUND STUDIO HANNOVER',
            'title_sub': 'SAMPLE <span class="highlight">SOUNDDESIGN</span> BEATS',
            'title_tagline': 'MOLDEANDO EL FUTURO JUNTOS',
            'powered_by': 'powered by',
            'btn_explore': 'GENRE OVERVIEW',
            'btn_project': 'ESCRIBIR LETRAS Y NOTAS',
            'scroll_text': 'DESPLAZARSE',
            // Portfolio
            'port_title': 'GENRE OVERVIEW',
            'port_subtitle': 'Descubre sonidos de vista previa exclusivos de los 15 géneros.',
            // Newsletter
            'nl_title': 'STAY IN THE LOOP',
            'nl_subtitle': 'Recibe paquetes de sonido exclusivos, actualizaciones de estudio y consejos de expertos en tu bandeja de entrada.',
            'nl_btn': 'SUSCRIBIRSE',
            'nl_privacy_text': 'Doy mi consentimiento para el procesamiento de mis datos. (<a href="privacy.html" target="_blank" class="gold-link">Política de Privacidad</a>)',
            'nl_success': '¡Genial! Gracias por suscribirte ✨',
            'nl_error': 'Hubo un problema. Por favor inténtelo de nuevo.',
            // Notepad ES
            'note_hint': 'Escribe tus nuevas letras...',
            'note_btn_download': 'Guardar como .txt',
            // Generator ES
            'gen_title': 'AI-Prompt Engine',
            'gen_subtitle': 'Configura tu visión sonora para la generación por IA.',
            'gen_label_style': 'CARÁCTER DE SONIDO (ESTILO)',
            'gen_label_mood': 'ATMÓSFERA (CUBIERTA)',
            'gen_label_tempo': 'TEMPO (BPM)',
            'gen_label_tonart': 'TONALIDAD (CLAVE)',
            'gen_label_takt': 'COMPÁS',
            'gen_btn_apply': 'APLICAR Y CONTINUAR',
            'gen_opt_industrial': 'Cyberpunk',
            'gen_opt_lofi': 'Lofi Hiphop',
            'gen_opt_dark': 'Cinematic',
            'gen_opt_drill': 'Drill',
            'gen_opt_house': 'House',
            'gen_opt_pop': 'POP',
            'gen_opt_rock': 'Rock',
            'gen_opt_reggaeton': 'Reggaeton',
            'gen_opt_hiphop': 'Hip-Hop',
            'gen_opt_meditation': 'Meditation',
            'gen_opt_metal': 'Metal',
            'gen_opt_edm': 'EDM',
            'gen_opt_soul': 'Soul',
            'gen_opt_reggae': 'Reggae',
            'gen_opt_kpop': 'K-POP',
            'gen_opt_heavy': 'Oscuro y Pesado',
            'gen_opt_clear': 'Etéreo y Claro',
            'gen_opt_analog': 'Cálido y Analógico',
            'gen_btn_generate': 'GENERAR PROMPTS',
            'gen_btn_copy': 'COPIAR PROMPT',
            'gen_btn_play': 'REPRODUCIR DEMO 🎧',
            'gen_copied': '¡COPIADO! ✓',
            'gen_playing': 'REPRODUCIENDO... 🔊',
            'port_sample_house': 'Melodic House Vibe',
            'gen_btn_generate_1': 'GENERAR PROMPTS',
            // Generator 2 ES
            'gen_title_2': 'AI-Sound Engine',
            'gen_subtitle_2': 'Genera variaciones de sonido exclusivas en tiempo real.',
            'gen_btn_generate_2': 'GENERAR SONIDO',
            'gen_listen_2': 'ESCUCHAR SONIDO',
            'gen_download_2': 'DESCARGAR SONIDO',
            'gen_btn_play_2': 'REPRODUCIR SONIDO 🔊',
            'gen_playing_2': 'GENERANDO... 🔊',
            'gen_status_ready': 'Listo para la generación...',
            'gen_status_composing': 'La IA está componiendo tu ritmo...',
            'gen_status_done': '¡Generación completa!',
            'gen_reset_2': 'Crear nuevo ritmo',
            'gen_download_success': '¡Ritmo guardado con éxito!',
            'gen_download_start': '✔ ¡Descarga iniciada!',
            'work_title': 'DE LA VISIÓN AL OBJETIVO',
            'work_intro': 'Bienvenido a la avanzada base del Sound Studio Hannover. Mi motor de IA dual está diseñado para derribar la barrera entre tu idea creativa y la experiencia sonora final.',
            'work_body': 'Mientras que el Prompt Engine (Izquierda) traduce tus visiones abstractas en instrucciones técnicas precisas, el Sound Engine (Derecha) materializa a partir de ellas un audio único, exclusivo y potenciado por IA. Es el camino más corto del mundo no solo para pensar en diseño de sonido, sino para hacerlo audible al instante.',
            'work_footer': '¿Por qué VIR2OSE? Porque combino la experiencia humana con la potencia de cálculo ilimitada de la próxima generación de IA (Gemini 3 Flash). Tú aportas la chispa – yo entrego el ritmo.',
            'work_btn': 'SABER MÁS SOBRE EL ESTUDIO',
            // About Me ES
            'nav_about': 'SOBRE MÍ',
            'about_title': 'SOBRE MÍ',
            'about_intro': '¡Bienvenido! Mi nombre es Waldemar Krucinski. Mi trabajo profesional se asienta sobre tres pilares esenciales que combinan la artesanía creativa, la experiencia certificada por el estado y el espíritu pionero tecnológico: Producción Musical, Diseño de Medios y Sistemas de Red.',
            'about_col1_title': '1. Música: Producción Certificada',
            'about_col1_text': 'Para mí, la música es un proceso holístico al más alto nivel técnico. Como Productor Musical certificado por el estado (Diploma de HOFA College), cuento con una profunda experiencia en toda la cadena de producción. Mi enfoque está en un sonido premium y una implementación estructurada, desde la visión inicial hasta el máster final.',
            'about_col1_exp_title': 'Experiencia:',
            'about_col1_exp_text': 'Planificación de Proyectos, Composición, Diseño de Sonido, Grabación, Edición, Programación de Baterías, Mezcla y Masterización.',
            'about_col1_cert_title': 'Certificación:',
            'about_col1_cert_text': 'Mis calificaciones son comprobables a través del Diploma reconocido por el estado y los certificados correspondientes.',
            'about_col2_title': '2. Diseño de Medios: Audio y Video Profesional',
            'about_col2_text': 'En el mundo visual, combino el storytelling creativo con la precisión artesanal. Como Diseñador de Medios de Imagen y Sonido certificado por IHK, domino los estándares técnicos y de diseño de la industria de los medios. Acompaño los proyectos en todas las fases de la postproducción y garantizo un flujo de trabajo profesional.',
            'about_col2_skill_title': 'Habilidades:',
            'about_col2_skill_text': 'Planificación de Sets de Cámara, Edición de Video de Alta Gama (DaVinci Resolve Studio, Avid, FCP), Animación, Diseño Gráfico, Doblaje y Producciones Cinematográficas Completas.',
            'about_col3_title': '3. Redes e IT: Innovación y Futuro',
            'about_col3_text': 'El tercer pilar forma mi pasión por el arte de redes y la programación moderna. Aquí opero como un "Early Adopter" ambicioso: mi interés crece con cada innovación tecnológica. Experimento intensamente con herramientas de Agentes de IA, VS Cloud y GitHub. Me fascinan las intersecciones entre la infraestructura técnica y los conceptos con visión de futuro como la tecnología Antigravity.',
            'about_claim': '<strong>Mi Lema:</strong> Ya sea acústica, imagen o redes digitales – defiendo proyectos que convencen a través de un profundo know-how, calidad dual certificada por el estado y el valor de adoptar nuevas tecnologías.',
            // Services ES
            'services_title': 'SERVICIOS',
            'services_intro': 'Con mi doble cualificación como Diseñador de Medios IHK y Productor Musical certificado, te garantizo un flujo de trabajo que combina creatividad con perfección técnica. Cada proyecto se maneja de forma individual y recibe el acabado adecuado.',
            'srv_card1_title': 'El Especial "Studio Experience"',
            'srv_card1_desc': '¿Has generado un ritmo o pista y ahora buscas el salto decisivo en calidad? Ven directamente a mi estudio.',
            'srv_card1_item1': '<strong>Grabación de Voces:</strong> Graba tu voz en un entorno acústico profesional.',
            'srv_card1_item2': '<strong>Producción Full-Service:</strong> Me encargo de todo el proceso artesanal, desde la edición precisa y la mezcla creativa hasta la masterización final y contundente.',
            'srv_card1_item3': '<strong>El Resultado:</strong> Una canción o banda sonora terminada que está lista para la radio y cumple con los estándares profesionales.',
            'srv_card1_footer': 'Ya seas de la región o viajes de lejos, reserva tu día personal de sesión y perfecciona tu proyecto.',
            'srv_card2_title': 'Producción Musical e Ingeniería',
            'srv_card2_desc': 'Como Productor Musical certificado, acompaño tu proyecto con excelencia técnica:',
            'srv_card2_item1': '<strong>Grabación y Edición:</strong> Grabaciones limpias y sincronización perfecta para cada instrumento.',
            'srv_card2_item2': '<strong>Programación de Baterías:</strong> Ritmos individuales y contundentes que le dan a tu pista la base necesaria.',
            'srv_card2_item3': '<strong>Mezcla y Masterización:</strong> Una mezcla transparente y equilibrada y un máster final impactante que convence en todos los dispositivos.',
            'srv_card3_title': 'Diseño de Sonido para Cine y Video',
            'srv_card3_desc': 'Dale a tu contenido visual la profundidad acústica que se merece:',
            'srv_card3_item1': '<strong>Diseño de Sonido Cinematográfico:</strong> Paisajes sonoros y atmósferas a medida para películas o comerciales.',
            'srv_card3_item2': '<strong>Doblaje:</strong> Sincronización precisa de sonido e imagen para un efecto inmersivo.',
            'srv_card4_title': 'Podcasting y Voiceover',
            'srv_card4_desc': 'Sonido profesional para tu mensaje:',
            'srv_card4_item1': '<strong>Postproducción de Audio:</strong> Aseguro voces claras, elimino el ruido de fondo y optimizo el flujo de tus episodios de podcast.',
            // Contact ES
            'contact_title': 'CONTACTO',
            'contact_intro': 'Hagamos realidad tu próximo proyecto de audio juntos. Envíame un mensaje o reserva una sesión directamente en el estudio.',
            'contact_info_title': 'CONTACTO DIRECTO',
            'contact_info_desc': 'Espero con gusto tu consulta y te responderé a la brevedad.',
            'contact_info_response_time': 'Normalmente respondo en un plazo de 24 horas.',
            'contact_form_title': 'ENVIAR UN MENSAJE',
            'contact_label_name': 'NOMBRE',
            'contact_label_email': 'CORREO ELECTRÓNICO',
            'contact_label_subject': 'ASUNTO',
            'contact_opt_prod': 'Producción Musical / Beatmaking',
            'contact_opt_mix': 'Mezcla y Masterización',
            'contact_opt_video': 'Diseño de Sonido para Video',
            'contact_opt_other': 'Otra Consulta',
            'contact_label_msg': 'MENSAJE',
            'contact_btn_send': 'ENVIAR MENSAJE',
            // Footer ES
            'footer_copyright': '© Waldemar Krucinski Hannover 2026',
            'footer_privacy': 'Política de Privacidad y Aviso Legal'
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
            'btn_explore': 'GENRE OVERVIEW',
            'btn_project': 'PISZ TEKSTY I NOTATKI',
            'scroll_text': 'PRZEWIŃ',
            // Portfolio
            'port_title': 'GENRE OVERVIEW',
            'port_subtitle': 'Odkryj ekskluzywne dźwięki poglądowe ze wszystkich 15 gatunków.',
            // Newsletter
            'nl_title': 'STAY IN THE LOOP',
            'nl_subtitle': 'Otrzymuj ekskluzywne pakiety dźwiękowe, aktualizacje ze studia i wskazówki bezpośrednio do swojej skrzynki.',
            'nl_btn': 'ZAPISZ SIĘ',
            'nl_privacy_text': 'Wyrażam zgodę na przetwarzanie moich danych. (<a href="privacy.html" target="_blank" class="gold-link">Polityka prywatności</a>)',
            'nl_success': 'Świetnie! Dziękujemy za subskrypcję ✨',
            'nl_error': 'Wystąpił problem. Proszę spróbować ponownie.',
            // Notepad PL
            'note_hint': 'Napisz swój nowy tekst...',
            'note_btn_download': 'Zapisz jako .txt',
            // Generator PL
            'gen_title': 'AI-Prompt Engine',
            'gen_subtitle': 'Konfiguruj swoją wizję dźwięku dla generowania przez AI.',
            'gen_label_style': 'CHARAKTER DŹWIĘKU (STYLE)',
            'gen_label_mood': 'ATMOSFERA (MOOD)',
            'gen_label_tempo': 'TEMPO (BPM)',
            'gen_label_tonart': 'TONACJA (KLUCZ)',
            'gen_label_takt': 'METRUM',
            'gen_btn_apply': 'ZASTOSUJ I DALEJ',
            'gen_opt_industrial': 'Cyberpunk',
            'gen_opt_lofi': 'Luksusowe Lofi',
            'gen_opt_dark': 'Mroczne Cinematic',
            'gen_opt_drill': 'Mocny Drill',
            'gen_opt_house': 'Melodyjny House',
            'gen_opt_pop': 'POP',
            'gen_opt_rock': 'Rock',
            'gen_opt_reggaeton': 'Reggaeton',
            'gen_opt_hiphop': 'Hip-Hop',
            'gen_opt_meditation': 'Medytacja',
            'gen_opt_metal': 'Metal',
            'gen_opt_edm': 'EDM',
            'gen_opt_soul': 'Soul',
            'gen_opt_reggae': 'Reggae',
            'gen_opt_kpop': 'K-POP',
            'gen_opt_heavy': 'Mroczny i Ciężki',
            'gen_opt_clear': 'Eteryczny i Czysty',
            'gen_opt_analog': 'Ciepły i Analogowy',
            'gen_btn_generate': 'GENERATE PROMPTS',
            'gen_btn_copy': 'KOPIUJ PROMPT',
            'gen_btn_play': 'ODTWÓRZ DEMO 🎧',
            'gen_copied': 'SKOPIOWANO! ✓',
            'gen_playing': 'ODTWARZANIE... 🔊',
            'port_sample_house': 'Melodic House Vibe',
            'gen_btn_generate_1': 'GENERATE PROMPTS',
            // Generator 2 PL
            'gen_title_2': 'AI-Sound Engine',
            'gen_subtitle_2': 'Generuj ekskluzywne wariacje dźwiękowe w czasie rzeczywistym.',
            'gen_btn_generate_2': 'GENERATE SOUND',
            'gen_listen_2': 'POSŁUCHAJ DŹWIĘKU',
            'gen_download_2': 'POBIERZ DŹWIĘK',
            'gen_btn_play_2': 'GRAJ DŹWIĘK 🔊',
            'gen_playing_2': 'GENEROWANIE... 🔊',
            'gen_status_ready': 'Gotowy do generowania...',
            'gen_status_composing': 'AI komponuje Twój beat...',
            'gen_status_done': 'Generowanie zakończone!',
            'gen_reset_2': 'Stwórz nowy beat',
            'gen_download_success': 'Beat zapisany pomyślnie!',
            'gen_download_start': '✔ Pobieranie rozpoczęte!',
            'work_title': 'OD WIZJI DO CELU',
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

            'about_claim': '<strong>Moje motto:</strong> Niezależnie od tego, czy chodzi o akustykę, obraz czy sieci cyfrowe – reprezentuję projekty, które przekonują szeroką wiedzą, podwójnie certyfikowaną jakością i odwagą do wdrażania nowych technologii.',
            // Services PL
            'services_title': 'USŁUGI',
            'services_intro': 'Dzięki moim podwójnym kwalifikacjom jako Projektant Mediów IHK oraz Państwowy Producent Muzyczny, gwarantuję przepływ pracy, który łączy kreatywność z techniczną perfekcją. Każdy projekt jest traktowany indywidualnie i otrzymuje odpowiednie wykończenie.',
            'srv_card1_title': 'Special "Studio Experience"',
            'srv_card1_desc': 'Wygenerowałeś beat lub playback i szukasz decydującego skoku jakości? Przyjdź bezpośrednio do mojego studia.',
            'srv_card1_item1': '<strong>Nagrywanie wokalu:</strong> Nagraj swój głos w profesjonalnym środowisku akustycznym.',
            'srv_card1_item2': '<strong>Produkcja Full-Service:</strong> Zajmuję się całym rzemiosłem – od precyzyjnej edycji i kreatywnego miksowania po ostateczny, mocny mastering.',
            'srv_card1_item3': '<strong>Rezultat:</strong> Gotowy utwór lub ścieżka dźwiękowa, która jest gotowa do emisji radiowej i spełnia profesjonalne standardy.',
            'srv_card1_footer': 'Niezależnie czy jesteś z regionu, czy podróżujesz – zarezerwuj swój osobisty dzień sesyjny i dopracuj swój projekt.',
            'srv_card2_title': 'Produkcja muzyczna & Inżynieria',
            'srv_card2_desc': 'Jako państwowy Producent Muzyczny towarzyszę Twojemu projektowi z techniczną doskonałością:',
            'srv_card2_item1': '<strong>Nagrywanie i edycja:</strong> Czyste nagrania i perfekcyjny timing dla każdego instrumentu.',
            'srv_card2_item2': '<strong>Programowanie bębnów:</strong> Indywidualne i mocne uderzenia, które nadają Twojemu utworowi niezbędny fundament.',
            'srv_card2_item3': '<strong>Miksowanie i mastering:</strong> Przejrzysty, zbalansowany miks i finałowy master, który przekonuje na wszystkich urządzeniach.',
            'srv_card3_title': 'Sound Design dla Filmu i Wideo',
            'srv_card3_desc': 'Nadaj swojej treści wizualnej odpowiednią głębię akustyczną:',
            'srv_card3_item1': '<strong>Sound Design Filmowy:</strong> Dopasowane na miarę pejzaże dźwiękowe i atmosfery do filmów lub reklam.',
            'srv_card3_item2': '<strong>Dubbing:</strong> Precyzyjna synchronizacja dźwięku i obrazu dla osiągnięcia efektu zanurzenia.',
            'srv_card4_title': 'Podcasting & Voiceover',
            'srv_card4_desc': 'Profesjonalny dźwięk dla Twojej wiadomości:',
            'srv_card4_item1': '<strong>Postprodukcja Audio:</strong> Zapewniam czysty głos, usuwam zakłócenia i optymalizuję przepływ Twoich odcinków podcastowych.',
            // Contact PL
            'contact_title': 'KONTAKT',
            'contact_intro': 'Zrealizujmy wspólnie Twój następny projekt audio. Wyślij mi wiadomość lub zarezerwuj sesję w studiu.',
            'contact_info_title': 'KONTAKT BEZPOŚREDNI',
            'contact_info_desc': 'Czekam na każde zapytanie i odpowiem najszybciej jak to możliwe.',
            'contact_info_response_time': 'Zazwyczaj odpowiadam w ciągu 24 godzin.',
            'contact_form_title': 'WYŚLIJ WIADOMOOŚĆ',
            'contact_label_name': 'IMIĘ',
            'contact_label_email': 'E-MAIL',
            'contact_label_subject': 'TEMAT',
            'contact_opt_prod': 'Produkcja Muzyczna / Beatmaking',
            'contact_opt_mix': 'Miks i Mastering',
            'contact_opt_video': 'Sound Design Wideo',
            'contact_opt_other': 'Inne zapytanie',
            'contact_label_msg': 'WIADOMOŚĆ',
            'contact_btn_send': 'WYŚLIJ WIADOMOŚĆ',
            // Footer PL
            'footer_copyright': '© Waldemar Krucinski Hannover 2026',
            'footer_privacy': 'Polityka prywatności & Nota prawna'
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
        
        // Update active class on flags
        document.querySelectorAll('.lang-flag').forEach(flag => {
            if (flag.onclick.toString().includes(`'${lang}'`)) {
                flag.classList.add('active');
            } else {
                flag.classList.remove('active');
            }
        });
        
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
                const newSpacing = currentSpacing + (diff / charCount);
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
            partialRender: true,
            interact: false,
            mediaControls: false,
            pixelRatio: 1
        });

        initScrubber();

        // Phase 39: Wavesurfer idle mode — stop redrawing when audio finishes
        wavesurfer.on('finish', () => {
            wavesurfer.empty();
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
    const waveParticleCount = 30;
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
        // Optimization: Reduced ribbons per layer and layers overall
        const layers = [
            { amp: 35, freq: 0.0015, speed: 0.12, color: 'rgba(197, 165, 90, 0.18)', ribbons: 2 },
            { amp: 20, freq: 0.003, speed: -0.08, color: 'rgba(232, 213, 160, 0.12)', ribbons: 1 },
            { amp: 45, freq: 0.001, speed: 0.05, color: 'rgba(138, 115, 64, 0.12)', ribbons: 1 }
        ];

        layers.forEach((l, i) => {
            const timeOffset = i * 25;
            for (let r = 0; r < l.ribbons; r++) {
                wCtx.beginPath();
                wCtx.lineWidth = 0.3 + Math.random() * 0.5;
                wCtx.strokeStyle = l.color;

                const ribbonOffset = r * 8;
                wCtx.moveTo(0, centerY);

                // Optimization: Doubled x step size from 20 to 40 for 50% less loop execution
                for (let x = 0; x <= width; x += 40) {
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

    // Optimization: Cache hero selector completely outside loop
    const heroContent = document.querySelector('.hero-content');
    let isCanvasVisible = true;
    let isWaveVisible = true;
    let isTabVisible = true;

    // Phase 39: Visibility API — fully pause ALL rendering when tab is hidden
    document.addEventListener('visibilitychange', () => {
        isTabVisible = !document.hidden;
        if (document.hidden) {
            document.body.classList.add('paused-anim');
        } else {
            document.body.classList.remove('paused-anim');
        }
    });
    window.addEventListener('blur', () => { isTabVisible = false; document.body.classList.add('paused-anim'); });
    window.addEventListener('focus', () => { isTabVisible = true; document.body.classList.remove('paused-anim'); });

    // Phase 39: Intersection Observer for hero canvas
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            isCanvasVisible = entries[0].isIntersecting;
        }, { threshold: 0.01 });
        heroObserver.observe(heroSection);
    }

    // Phase 39: Intersection Observer for wave section — only draw waves when visible
    const waveSection = document.querySelector('.wave-section') || (waveCanvas ? waveCanvas.parentElement : null);
    if (waveSection) {
        const waveObserver = new IntersectionObserver((entries) => {
            isWaveVisible = entries[0].isIntersecting;
        }, { threshold: 0.01 });
        waveObserver.observe(waveSection);
    }

    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime) {
        requestAnimationFrame(animate);

        // Phase 39: Skip ALL calculations if tab is hidden or minimized
        if (!isTabVisible) return;

        if (currentTime === undefined) currentTime = performance.now();
        const deltaTime = currentTime - lastFrameTime;

        if (deltaTime > frameInterval) {
            lastFrameTime = currentTime - (deltaTime % frameInterval);

            time += 0.002;

            // Only draw hero canvas if it's in the viewport
            if (isCanvasVisible && pCtx) {
                pCtx.clearRect(0, 0, width, height);
                drawGrid();
                particles.forEach(p => { p.update(); p.draw(); });

                const ux = (mouseX - 0.5) * 2;
                const uy = (mouseY - 0.5) * 2;
                if (heroContent) heroContent.style.transform = `translate(${ux * 10}px, ${uy * 6}px)`;
            }

            // Phase 39: Only draw liquid wave if wave section is in viewport
            if (isWaveVisible) {
                drawLiquidWave();
            }
        }
    }
    requestAnimationFrame(animate);

    // Optimization: Throttle extremely fast mouse events using requestAnimationFrame to prevent global CSS custom property repaints
    let mouseTick = false;
    const mouseLight = document.getElementById('mouse-light');

    document.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX / width;
        targetMouseY = e.clientY / height;

        if (!mouseTick && mouseLight && isCanvasVisible) {
            requestAnimationFrame(() => {
                // Apply ONLY to the mouse-light element, otherwise updating :root repaints the entire DOM!
                mouseLight.style.setProperty('--x', e.clientX + 'px');
                mouseLight.style.setProperty('--y', e.clientY + 'px');
                mouseTick = false;
            });
            mouseTick = true;
        }
    }, { passive: true });

    // ──────────────── AI Prompt Engine Logic ────────────────
    const genreAudioMap = {
        'Cyberpunk': [
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Analog Afterglow.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Crystal Grime.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Crystal Industry.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Ethereal Engine.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Ethereal Grime.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Gritty Circuit.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Industrial Shadows.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Neon Grit.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Riot Logic.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Static Revolt.mp3',
            'sounds/audio gen/Cyberpunk/VIR2OSE_Soundstudio_Vintage Distortion.mp3'
        ],
        'Lofi Hiphop': [
            'sounds/audio gen/Lofi Hiphop/VIR2OSE_Soundstudio_Crystal Lounge.mp3',
            'sounds/audio gen/Lofi Hiphop/VIR2OSE_Soundstudio_Ethereal Dust.mp3',
            'sounds/audio gen/Lofi Hiphop/VIR2OSE_Soundstudio_Golden Hour Jazz.mp3',
            'sounds/audio gen/Lofi Hiphop/VIR2OSE_Soundstudio_Heavy Velvet.mp3',
            'sounds/audio gen/Lofi Hiphop/VIR2OSE_Soundstudio_Midnight Noir.mp3',
            'sounds/audio gen/Lofi Hiphop/VIR2OSE_Soundstudio_Nostalgic Nights.mp3',
            'sounds/audio gen/Lofi Hiphop/VIR2OSE_Soundstudio_Rebel Lounge.mp3'
        ],
        'Cinematic Orchestral': [
            'sounds/audio gen/Cinematc/VIR2OSE_Soundstudio_Abyssal Reach.mp3',
            'sounds/audio gen/Cinematc/VIR2OSE_Soundstudio_Ancient Signal.mp3',
            'sounds/audio gen/Cinematc/VIR2OSE_Soundstudio_Celestial Depths.mp3',
            'sounds/audio gen/Cinematc/VIR2OSE_Soundstudio_Faded Dynasty.mp3',
            'sounds/audio gen/Cinematc/VIR2OSE_Soundstudio_Riotous Echoes.mp3',
            "sounds/audio gen/Cinematc/VIR2OSE_Soundstudio_Titan's Shadow.mp3",
            'sounds/audio gen/Cinematc/VIR2OSE_Soundstudio_Void Echoes.mp3'
        ],
        'Drill Rap': [
            'sounds/audio gen/Drill/VIR2OSE_Soundstudio_Analog Drill Echoes.mp3',
            'sounds/audio gen/Drill/VIR2OSE_Soundstudio_Crystal Glide.mp3',
            'sounds/audio gen/Drill/VIR2OSE_Soundstudio_Ethereal Drill Pushing.mp3',
            'sounds/audio gen/Drill/VIR2OSE_Soundstudio_Heavy Industry Drill.mp3',
            'sounds/audio gen/Drill/VIR2OSE_Soundstudio_Riot Drill.mp3',
            'sounds/audio gen/Drill/VIR2OSE_Soundstudio_Shadow Glide.mp3',
            'sounds/audio gen/Drill/VIR2OSE_Soundstudio_Static Revolt Drill.mp3'
        ],
        'House Music': [
            'sounds/audio gen/House/VIR2OSE_Soundstudio_Crystal Horizon.mp3',
            'sounds/audio gen/House/VIR2OSE_Soundstudio_Heavy Pumping House.mp3',
            'sounds/audio gen/House/VIR2OSE_Soundstudio_Rebel Pulse.mp3'
        ],
        'Pop Music': [
            'sounds/audio gen/POP/VIR2OSE_Soundstudio_Bright Analog Pop Instrumental 1.mp3',
            'sounds/audio gen/POP/VIR2OSE_Soundstudio_Bright Analog Pop Instrumental 2.mp3',
            'sounds/audio gen/POP/VIR2OSE_Soundstudio_Ethereal Pop Instrumental 1.mp3',
            'sounds/audio gen/POP/VIR2OSE_Soundstudio_Ethereal Pop Instrumental 2.mp3',
            'sounds/audio gen/POP/VIR2OSE_Soundstudio_Nostalgic Pop Groove 1.mp3',
            'sounds/audio gen/POP/VIR2OSE_Soundstudio_Nostalgic Pop Groove 2.mp3',
            'sounds/audio gen/POP/VIR2OSE_Soundstudio_Pop Beat 1.mp3',
            'sounds/audio gen/POP/VIR2OSE_Soundstudio_Pop Beat 2.mp3'
        ],
        'Rock': [
            'sounds/audio gen/Rock/VIR2OSE_Soundstudio_Ethereal Rock Drive (115 BPM) 1.mp3',
            'sounds/audio gen/Rock/VIR2OSE_Soundstudio_Ethereal Rock Drive (115 BPM) 2.mp3',
            'sounds/audio gen/Rock/VIR2OSE_Soundstudio_Ethereal Rock Drive 1.mp3',
            'sounds/audio gen/Rock/VIR2OSE_Soundstudio_Ethereal Rock Drive 2.mp3',
            'sounds/audio gen/Rock/VIR2OSE_Soundstudio_Heavy Rock Stomp.mp3',
            'sounds/audio gen/Rock/VIR2OSE_Soundstudio_Nostalgic Rock Stomp 1.mp3',
            'sounds/audio gen/Rock/VIR2OSE_Soundstudio_Nostalgic Rock Stomp 2.mp3'
        ],
        'Reggaeton': [
            'sounds/audio gen/Reggaeton/VIR2OSE_Soundstudio_Dembow 110_1.mp3',
            'sounds/audio gen/Reggaeton/VIR2OSE_Soundstudio_Dembow 110_2.mp3',
            'sounds/audio gen/Reggaeton/VIR2OSE_Soundstudio_Nostalgic Reggaeton 120_1.mp3',
            'sounds/audio gen/Reggaeton/VIR2OSE_Soundstudio_Nostalgic Reggaeton 120_2.mp3',
            'sounds/audio gen/Reggaeton/VIR2OSE_Soundstudio_Ominous Dembow 1.mp3',
            'sounds/audio gen/Reggaeton/VIR2OSE_Soundstudio_Ominous Dembow 2.mp3',
            'sounds/audio gen/Reggaeton/VIR2OSE_Soundstudio_Reggaeton Instrumental 2.mp3'
        ],
        'Hip-Hop': [
            'sounds/audio gen/Hip-Hop/VIR2OSE Studios_ Drill_Dark & Heavy.mp3',
            'sounds/audio gen/Hip-Hop/VIR2OSE Studios_ Drill_Ethereal & Clear.mp3',
            'sounds/audio gen/Hip-Hop/VIR2OSE Studios_ Drill_Warm & Analog.mp3'
        ],
        'Meditation Music': [
            'sounds/audio gen/Meditation/VIR2OSE_Soundstudio_Crystal Clear Meditation.mp3',
            'sounds/audio gen/Meditation/VIR2OSE_Soundstudio_Native Earth Meditation 1.mp3',
            'sounds/audio gen/Meditation/VIR2OSE_Soundstudio_Native Earth Meditation 2.mp3',
            'sounds/audio gen/Meditation/VIR2OSE_Soundstudio_Nostalgic Meditation 1.mp3',
            'sounds/audio gen/Meditation/VIR2OSE_Soundstudio_Nostalgic Meditation 2.mp3',
            'sounds/audio gen/Meditation/VIR2OSE_Soundstudio_Nostalgic Stillness 2.mp3',
            'sounds/audio gen/Meditation/VIR2OSE_Soundstudio_Nostalgic Stillness 3.mp3'
        ],
        'Soul R&B': [
            'sounds/audio gen/Soul/VIR2OSE_Soundstudio_Ethereal R&B Groove 1.mp3',
            'sounds/audio gen/Soul/VIR2OSE_Soundstudio_Ethereal R&B Groove 2.mp3',
            'sounds/audio gen/Soul/VIR2OSE_Soundstudio_Warm Vintage Soul 1.mp3'
        ],
        'Reggae': [
            'sounds/audio gen/Reggae/VIR2OSE_Soundstudio_Heavy Roots Dub 1.mp3',
            'sounds/audio gen/Reggae/VIR2OSE_Soundstudio_Heavy Roots Dub 2.mp3',
            'sounds/audio gen/Reggae/VIR2OSE_Soundstudio_Nostalgic Reggae Rhythm 1.mp3'
        ],
        'K-POP': [
            'sounds/audio gen/K-Pop/VIR2OSE_Soundstudio_Bright K-Pop Anthem 1.mp3',
            'sounds/audio gen/K-Pop/VIR2OSE_Soundstudio_Bright K-Pop Anthem 2.mp3',
            'sounds/audio gen/K-Pop/VIR2OSE_Soundstudio_Crystal Clear K-Pop 1.mp3'
        ],
        'Heavy Metal': [
            'sounds/audio gen/Metal/VIR2OSE_Soundstudio_Analog Grind (Instrumental).mp3',
            'sounds/audio gen/Metal/VIR2OSE_Soundstudio_Crystal Grind (Instrumental).mp3',
            'sounds/audio gen/Metal/VIR2OSE_Soundstudio_Dark Logic 2.mp3',
            'sounds/audio gen/Metal/VIR2OSE_Soundstudio_Ethereal Metal (Instrumental).mp3',
            'sounds/audio gen/Metal/VIR2OSE_Soundstudio_Iron Pulse 1.mp3',
            'sounds/audio gen/Metal/VIR2OSE_Soundstudio_Mechanical Nostalgia (Instrumental).mp3'
        ],
        'EDM': [
            'sounds/audio gen/EDM/VIR2OSE_Soundstudio_Analog Horizon 1.mp3',
            'sounds/audio gen/EDM/VIR2OSE_Soundstudio_Analog Horizon 2.mp3',
            'sounds/audio gen/EDM/VIR2OSE_Soundstudio_Crystal Clear Peak (Instrumental).mp3',
            'sounds/audio gen/EDM/VIR2OSE_Soundstudio_Ethereal Flow 1.mp3',
            'sounds/audio gen/EDM/VIR2OSE_Soundstudio_Ethereal Flow 2.mp3',
            'sounds/audio gen/EDM/VIR2OSE_Soundstudio_Midnight Pulse (Instrumental).mp3',
            'sounds/audio gen/EDM/VIR2OSE_Soundstudio_Neon Drive (Instrumental).mp3'
        ]
    };

    function applyConfiguration() {
        const genreEl = document.getElementById('genre');
        const vibeEl = document.getElementById('vibe');
        const tempoEl = document.getElementById('tempo');
        const tonartEl = document.getElementById('tonart');
        const taktEl = document.getElementById('takt');

        if (!genreEl || !vibeEl) return;

        const genreVal = genreEl.options[genreEl.selectedIndex].text;
        const vibeVal = vibeEl.options[vibeEl.selectedIndex].text;
        
        let tempoStr = (tempoEl && tempoEl.value.trim() !== '') ? `${tempoEl.value.trim()} BPM` : '120 BPM';
        let tonartStr = (tonartEl && tonartEl.value.trim() !== '') ? `Key of ${tonartEl.value.trim()}` : 'Key of C-Major';

        const summary = `Professional ${genreVal} Instrumental, ${vibeVal} Atmosphere, ${tempoStr}, ${tonartStr}, 44.1kHz Studio Quality, Target Duration: 180 Seconds.`;

        const summaryText = document.getElementById('summary-text');

        if (summaryText) {
            summaryText.value = summary;
            summaryText.style.display = 'block';
        }

        const rightSide = document.querySelector('.right-side');
        if (rightSide) {
            // Smooth scroll to the 2nd Generator
            rightSide.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        const rightEngine = document.getElementById('prompt-generator-container-2');
        if (rightEngine) {
            rightEngine.classList.remove('engine-pulse');
            void rightEngine.offsetWidth; // Force reflow
            rightEngine.classList.add('engine-pulse');
        }

        const generateBtn = document.querySelector('.right-side .btn-gen');
        if (generateBtn) {
            generateBtn.style.transition = 'all 0.3s ease';
            generateBtn.style.transform = 'scale(1.05)';
            generateBtn.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
            setTimeout(() => {
                generateBtn.style.transform = 'scale(1)';
                generateBtn.style.boxShadow = 'none';
            }, 800);
        }
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

        // If another sample is playing, stop it and reset its card
        if (currentCard) {
            currentCard.classList.remove('playing');
        }

        // Stop the generator audio if it was playing
        audio.pause();
        audio.loop = false;

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

    // copyPrompt removed

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

    function initScrubber() {
        const scrubber = document.getElementById('audio-scrubber');
        const timeCurrent = document.getElementById('scrubber-time-current');
        const timeTotal = document.getElementById('scrubber-time-total');
        
        if (!scrubber || !wavesurfer) return;

        let isScrubbing = false;

        scrubber.addEventListener('mousedown', () => isScrubbing = true);
        scrubber.addEventListener('touchstart', () => isScrubbing = true, { passive: true });
        
        scrubber.addEventListener('mouseup', () => isScrubbing = false);
        scrubber.addEventListener('touchend', () => isScrubbing = false);

        // Auto update scrubber as tune plays
        wavesurfer.on('audioprocess', function() {
            if(!isScrubbing && wavesurfer.getDuration() > 0) {
                const percent = (wavesurfer.getCurrentTime() / wavesurfer.getDuration()) * 100;
                scrubber.value = percent;
                timeCurrent.innerText = formatTime(wavesurfer.getCurrentTime());
            }
        });

        // Update total time when track loads
        wavesurfer.on('ready', function() {
            if (timeTotal) timeTotal.innerText = formatTime(wavesurfer.getDuration());
            if (timeCurrent) timeCurrent.innerText = "0:00";
            scrubber.value = 0;
            isScrubbing = false;
        });

        // User scrubs slider manually
        scrubber.addEventListener('input', function(e) {
            if(wavesurfer.getDuration() > 0) {
                const percent = e.target.value / 100;
                wavesurfer.seekTo(percent);
                timeCurrent.innerText = formatTime(wavesurfer.getCurrentTime());
            }
        });
    }

    // Helper for mm:ss
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return m + ":" + (s < 10 ? '0' : '') + s;
    }

    function playDemo() {
        const genreEl = document.getElementById('genre');
        const genreKey = genreEl ? genreEl.value : 'Cyberpunk';
        const demoFiles = genreAudioMap[genreKey] || genreAudioMap['Cyberpunk'];
        const demoFile = Array.isArray(demoFiles) ? demoFiles[Math.floor(Math.random() * demoFiles.length)] : demoFiles;

        if (wavesurfer && demoFile) {
            wavesurfer.load(demoFile);
            currentSoundURL = demoFile;
            wavesurfer.once('ready', () => { 
                wavesurfer.play(); 
            });

            const statusText = document.querySelector('#status-display p');
            const waveformContainer = document.getElementById('waveform-container');
            const playerControls = document.getElementById('player-controls');
            
            if (statusText) statusText.style.display = 'none';
            if (waveformContainer) waveformContainer.style.display = 'block';
            if (playerControls) {
                playerControls.style.display = 'flex';
                const playIcon = document.getElementById('play-pause-icon');
                if (playIcon) playIcon.innerText = '⏸';
            }
        }
    }

    function toggleWaveformPlayback() {
        if (!wavesurfer) return;

        if (!currentSoundURL) {
            playDemo();
            const playPauseIcon = document.getElementById('play-pause-icon');
            const btnUI = document.getElementById('btn-play-pause-ui');
            if (playPauseIcon) {
                playPauseIcon.innerText = '⏸';
                playPauseIcon.style.marginLeft = '0px';
                if(btnUI) btnUI.style.paddingLeft = '0px';
            }
            return;
        }
        
        wavesurfer.playPause();
        
        const playPauseIcon = document.getElementById('play-pause-icon');
        const btnUI = document.getElementById('btn-play-pause-ui');
        if (playPauseIcon) {
            if (wavesurfer.isPlaying()) {
                playPauseIcon.innerText = '⏸';
                playPauseIcon.style.marginLeft = '0px';
                if(btnUI) btnUI.style.paddingLeft = '0px';
            } else {
                playPauseIcon.innerText = '▶';
                playPauseIcon.style.marginLeft = '5px';
                if(btnUI) btnUI.style.paddingLeft = '6px';
            }
        }
    }

    window.toggleWaveformPlayback = toggleWaveformPlayback;
    window.applyConfiguration = applyConfiguration;
    window.playDemo = playDemo;

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

    // Configuration Constants
    const CONFIG = {
        USE_REAL_API: false, // Legacy boolean (Phase 9)
        USE_AI_GENERATION: true, // Activated! Route through Replicate API
        API_ENDPOINT: '/api/generate'
    };

    async function startSoundGeneration() {
        const summaryTextEl = document.getElementById('summary-text');
        const promptFromLeft = summaryTextEl ? summaryTextEl.value : '';
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

        // ──────────────── HYBRID API INTEGRATION BLOCK ────────────────
        if (CONFIG.USE_AI_GENERATION) {
            console.log("Routing via Vercel Backend to Replicate API...");
            try {
                // 1. Send the Prompt to Vercel (which pings Replicate)
                const initRes = await fetch('/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: promptFromLeft })
                });
                const initData = await initRes.json();

                // Sync API Success (e.g. Azure returning base64 instantly)
                if (initRes.status === 200 && initData.status === 'succeeded' && initData.output) {
                    const audioUrl = initData.output;
                    
                    statusDisplay.classList.remove('status-active');
                    statusText.style.display = 'none';

                    resultBox2.style.display = 'block';
                    setTimeout(() => resultBox2.classList.add('result-box-show'), 10);
                    waveformContainer.style.display = 'block';

                    currentSoundURL = audioUrl;
                    if (wavesurfer && currentSoundURL) {
                        wavesurfer.load(currentSoundURL);
                        wavesurfer.once('ready', () => { 
                            wavesurfer.play(); 
                            const playIcon = document.getElementById('play-pause-icon');
                            if (playIcon) playIcon.innerText = '⏸';
                        });
                    }

                    const downloadBtn = document.getElementById('download-btn');
                    if (downloadBtn) {
                        downloadBtn.href = currentSoundURL;
                        downloadBtn.download = `VIR2OSE_AI_Audio_${Date.now()}.wav`;
                        downloadBtn.classList.add('btn-breathe');
                        if (currentSoundURL.startsWith('http')) {
                            fetch(currentSoundURL)
                                .then(res => res.blob())
                                .then(blob => downloadBtn.href = URL.createObjectURL(blob))
                                .catch(e => console.error("Blob download failed:", e));
                        }
                    }
                    return; // Stop here, no polling needed for async Azure logic
                }

                // If Vercel has no API Key, or Async generation errored instantly, display error then fallback
                if (initRes.status !== 200 || initData.useFallback || initData.error || !initData.predictionId) {
                    const errMsg = initData.error || "Kein Token oder API Fehler.";
                    console.warn("Real API Error or Missing Token, Triggering Fail-Safe:", errMsg);
                    if (statusText) {
                        statusText.innerText = `API Fehler: ${errMsg}`;
                        statusText.style.color = '#ff4444';
                    }
                    setTimeout(() => {
                        if (statusText) statusText.style.color = '';
                        runSimulationFallback(promptFromLeft, currentLang);
                    }, 4000);
                    return;
                }

                // 2. Poll Replicate for the track status every 3 seconds to avoid 10s Serverless Timeouts!
                const pollInterval = setInterval(async () => {
                    try {
                        const pollRes = await fetch('/api/generate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ predictionId: initData.predictionId })
                        });
                        const pollData = await pollRes.json();
                        
                        if (pollData.status === 'succeeded') {
                            clearInterval(pollInterval);
                            const audioUrl = pollData.output; // MusicGen returns a URL string
                            
                            statusDisplay.classList.remove('status-active');
                            statusText.style.display = 'none';

                            resultBox2.style.display = 'block';
                            setTimeout(() => resultBox2.classList.add('result-box-show'), 10);
                            waveformContainer.style.display = 'block';

                            currentSoundURL = audioUrl;
                            if (wavesurfer && currentSoundURL) {
                                wavesurfer.load(currentSoundURL);
                                wavesurfer.once('ready', () => { 
                                    wavesurfer.play(); 
                                    const playIcon = document.getElementById('play-pause-icon');
                                    if (playIcon) playIcon.innerText = '⏸';
                                });
                            }

                            const downloadBtn = document.getElementById('download-btn');
                            if (downloadBtn) {
                                downloadBtn.href = currentSoundURL;
                                downloadBtn.download = `VIR2OSE_AI_Audio_${Date.now()}.mp3`;
                                downloadBtn.classList.add('btn-breathe');
                                
                                fetch(currentSoundURL)
                                    .then(res => res.blob())
                                    .then(blob => {
                                        const blobUrl = URL.createObjectURL(blob);
                                        downloadBtn.href = blobUrl;
                                    })
                                    .catch(e => console.error("Blob download failed:", e));
                            }
                        } else if (pollData.status === 'failed' || pollData.status === 'canceled') {
                            clearInterval(pollInterval);
                            console.error("Replicate task failed:", pollData.error);
                            if (statusText) {
                                statusText.innerText = `Replicate Fehler: ${pollData.error}`;
                                statusText.style.color = '#ff4444';
                            }
                            setTimeout(() => {
                                if (statusText) statusText.style.color = '';
                                runSimulationFallback(promptFromLeft, currentLang);
                            }, 4000);
                        } else {
                            // Status is "starting" or "processing" -> Keep waiting!
                            if (statusText && pollData.status === 'processing') {
                                statusText.innerText = "KI rendert Audio (ca. 10-25 Sek)...";
                            }
                        }
                    } catch (err) {
                        clearInterval(pollInterval);
                        console.error("Polling crash:", err);
                        runSimulationFallback(promptFromLeft, currentLang);
                    }
                }, 3000);
                
                return; // Early return to avoid running simulation below

            } catch (err) {
                console.error("API Call crash:", err);
                runSimulationFallback(promptFromLeft, currentLang);
            }
        }

        // ──────────────── SIMULATION BLOCK (Fallback/Current) ────────────────
        runSimulationFallback(promptFromLeft, currentLang);
    }

    // Extracted simulation logic for cleaner Fallback handling
    function runSimulationFallback(promptFromLeft, currentLang) {
        console.log("Starting 5-Second Bridge Simulation...");

        // Check for advanced inputs (Tempo, Key, Time)
        const tempoVal = document.getElementById('tempo') ? document.getElementById('tempo').value.trim() : '';
        const keyVal = document.getElementById('tonart') ? document.getElementById('tonart').value.trim() : '';
        const timeVal = document.getElementById('takt') ? document.getElementById('takt').value.trim() : '';

        const hasAdvancedInput = tempoVal !== '' || keyVal !== '' || timeVal !== '';

        // Simulate Production Delay (Exactly 5 Seconds)
        setTimeout(() => {
            const statusDisplay = document.getElementById('status-display');
            const statusText = statusDisplay ? statusDisplay.querySelector('p') : null;
            const resultBox2 = document.getElementById('result-box-2');
            const waveformContainer = document.getElementById('waveform-container');
            const playerControls = document.getElementById('player-controls');

            if (statusDisplay) statusDisplay.classList.remove('status-active');
            
            if (hasAdvancedInput) {
                if (statusText) statusText.innerText = "Custom Generation requires active API Backend.";
                
                if (resultBox2) {
                    resultBox2.style.display = 'block';
                    setTimeout(() => resultBox2.classList.add('result-box-show'), 10);
                }
                
                const promptOutput2 = document.getElementById('generated-prompt-2');
                if (promptOutput2) promptOutput2.innerText = `Warten auf neue Generierung - Custom-Eingaben erkannt...`;
                
                // Hide waveform & controls
                if (waveformContainer) waveformContainer.style.display = 'none';
                if (playerControls) playerControls.style.display = 'none';
                return; // Stop here, don't load a file
            }

            // Normal Library Fallback
            if (statusText) statusText.style.display = 'none';

            // Show result box with fade-in effect
            if (resultBox2) {
                resultBox2.style.display = 'block';
                setTimeout(() => resultBox2.classList.add('result-box-show'), 10);
            }

            if (waveformContainer) waveformContainer.style.display = 'block';

            if (playerControls) {
                playerControls.style.display = 'flex';
                const playIcon = document.getElementById('play-pause-icon');
                if (playIcon) playIcon.innerText = '⏸';
            }

            // Centralized Library Lookup
            const genreEl = document.getElementById('genre');
            const genreKey = genreEl ? genreEl.value : 'Cyberpunk';
            
            const demoFiles = genreAudioMap[genreKey] || genreAudioMap['Cyberpunk'];
            const demoFile = Array.isArray(demoFiles) 
                ? demoFiles[Math.floor(Math.random() * demoFiles.length)] 
                : demoFiles;

            if (wavesurfer && demoFile) {
                wavesurfer.load(demoFile);
                wavesurfer.once('ready', () => {
                    wavesurfer.play();
                });
            }

            // Update Download link & Activate Button
            currentSoundURL = demoFile;
            const downloadBtn = document.getElementById('download-btn');
            if (downloadBtn) {
                downloadBtn.href = currentSoundURL || '#';
                // Dynamically name the download file based on the selected file path
                const fileName = currentSoundURL ? currentSoundURL.split('/').pop() : 'VIR2OSE.wav';
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
        statusText.style.display = 'block';
        statusText.innerText = translations[currentLang]['gen_status_ready'] || 'Bereit...';

        // Hide waveform & controls
        const waveformContainer = document.getElementById('waveform-container');
        if (waveformContainer) waveformContainer.style.display = 'none';
        
        const playerControls = document.getElementById('player-controls');
        if (playerControls) playerControls.style.display = 'none';

        // Reset prompt link variable
        currentSoundURL = '';
        const downloadBtn = document.getElementById('download-btn');
        if (downloadBtn) {
            downloadBtn.href = '#';
            downloadBtn.classList.remove('btn-breathe');
        }

        // Stop Wavesurfer background loop
        if (wavesurfer) {
            wavesurfer.pause();
            wavesurfer.empty();
        }
    }

    // Export to global scope
    window.startSoundGeneration = startSoundGeneration;
    window.showSuccessMessage = showSuccessMessage;
    window.resetEngine2 = resetEngine2;
});


// ──────────────── Lyrics Notepad Logic ────────────────
window.toggleNotepad = function (e) {
    if (e) e.preventDefault();
    const overlay = document.getElementById('lyrics-overlay');
    if (overlay) {
        overlay.classList.toggle('active');
        if (overlay.classList.contains('active')) {
            setTimeout(() => document.getElementById('lyrics-text').focus(), 100);
        }
    }
};

window.downloadLyrics = function () {
    const text = document.getElementById('lyrics-text').value;
    if (!text.trim()) {
        alert("Bitte schreibe zuerst einen Text.");
        return;
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'VIR2OSE_Project_Lyrics.txt';
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
};

// Bind Notepad to "START A PROJECT" buttons
document.addEventListener('DOMContentLoaded', () => {
    const projectBtns = document.querySelectorAll('[data-i18n="btn_project"]');
    projectBtns.forEach(btn => {
        btn.onclick = window.toggleNotepad;
        btn.href = "#"; // Disable anchor scroll jump
    });

    const exploreBtns = document.querySelectorAll('a[href="#studio"]');
    exploreBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            document.getElementById('studio').scrollIntoView({ behavior: 'smooth' });
        };
    });
});


// ──────────────── Newsletter Form Submission (Phase 58) ────────────────
document.addEventListener('DOMContentLoaded', () => {
    const nlForm = document.getElementById('newsletter-form');
    if (!nlForm) return;

    nlForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('nl-email');
        if (!emailInput) return;

        const email = emailInput.value;
        const submitBtn = document.getElementById('btn-newsletter-submit');
        const loadingBtn = document.getElementById('btn-newsletter-loading');
        const successMsg = document.getElementById('nl-success-msg');
        const errorMsg = document.getElementById('nl-error-msg');
        const formRow = nlForm.querySelector('.form-group.row');

        // Reset UI
        if (errorMsg) errorMsg.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'none';
        if (loadingBtn) loadingBtn.style.display = 'inline-block';

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();

            if (response.ok) {
                if (successMsg) successMsg.style.display = 'block';
                if (formRow) formRow.style.display = 'none';
            } else {
                throw new Error(result.message || 'Subscription failed');
            }
        } catch (error) {
            console.error('Newsletter Error:', error);
            if (errorMsg) errorMsg.style.display = 'block';
            if (submitBtn) submitBtn.style.display = 'inline-block';
        } finally {
            if (loadingBtn) loadingBtn.style.display = 'none';
        }
    });
});

// ──────────────── Drawer Logic (Phase 50) ────────────────
function toggleDrawer() {
    const drawer = document.getElementById('nav-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}
