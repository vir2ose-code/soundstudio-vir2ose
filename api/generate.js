/**
 * API Handler für die Live AI Audio Generation (VIR2OSE Sound Engine)
 * Verbunden mit Azure AI Foundry (gpt-4o-audio-preview)
 */

export default async function handler(req, res) {
    // 1. Umgebungsvariablen & Konfiguration
    const ENABLE_AZURE_GENERATION = process.env.ENABLE_AZURE_GENERATION === 'true';
    const ADMIN_BYPASS_KEY = process.env.ADMIN_BYPASS_KEY;
    const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
    const AZURE_KEY = process.env.AZURE_OPENAI_KEY;
    const AZURE_DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;

    // Nur POST-Requests erlauben
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, adminKey, voice = "alloy", format = "wav" } = req.body;

    // 2. Validierung
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt ist erforderlich' });
    }

    // 3. Sicherheits-Check (Globaler Hebel vs. Admin Bypass)
    const isAuthorized = ENABLE_AZURE_GENERATION || (adminKey && adminKey === ADMIN_BYPASS_KEY);

    if (!isAuthorized) {
        console.log("Generierung deaktiviert: Sende Mock-Antwort");
        return res.status(200).json({
            success: true,
            isDemo: true,
            message: "Demo Mode Aktiv: Live-Generierung ist aktuell deaktiviert.",
            demoAudioUrl: "/sounds/vir2ose_demo_beat.mp3" 
        });
    }

    // 4. Azure AI Request Vorbereitung
    if (!AZURE_ENDPOINT || !AZURE_KEY || !AZURE_DEPLOYMENT) {
        console.error("Fehler: Azure Umgebungsvariablen fehlen!");
        return res.status(500).json({ error: 'Server-Konfigurationsfehler' });
    }

    try {
        const url = `${AZURE_ENDPOINT}/openai/deployments/${AZURE_DEPLOYMENT}/chat/completions?api-version=2024-05-01-preview`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': AZURE_KEY
            },
            body: JSON.stringify({
                messages: [
                    { 
                        role: 'system', 
                        content: 'You are VIR2OSE, a world-class AI music producer. Generate professional audio based on the user prompt.' 
                    },
                    { role: 'user', content: prompt }
                ],
                modalities: ["text", "audio"],
                audio: { 
                    voice: voice, 
                    format: format 
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Azure API Error:", errorData);
            return res.status(response.status).json({ 
                error: 'Azure AI Verarbeitungsfehler', 
                details: errorData.error?.message || errorData 
            });
        }

        const result = await response.json();
        
        // Audio-Daten extrahieren (Base64)
        const choice = result.choices[0];
        const audioObject = choice.message.audio;

        return res.status(200).json({
            success: true,
            text: choice.message.content || audioObject?.transcript,
            audioBase64: audioObject?.data, 
            audioId: audioObject?.id
        });

    } catch (err) {
        console.error("API Handler Fehler:", err);
        return res.status(500).json({ error: 'Interner Serverfehler', details: err.message });
    }
}
