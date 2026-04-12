export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const ENABLE_AZURE_GENERATION = process.env.ENABLE_AZURE_GENERATION === 'true'; // Global toggle
    const ADMIN_BYPASS_KEY = process.env.ADMIN_BYPASS_KEY;
    const { prompt, adminKey, predictionId } = req.body;

    // 1. Authorization: Allow if global toggle is ON or if Admin Key matches
    const isAuthorized = ENABLE_AZURE_GENERATION || (adminKey && adminKey === ADMIN_BYPASS_KEY);

    if (!isAuthorized) {
        return res.status(200).json({ 
            useFallback: true, 
            error: "Generation lock active. Admin Key required." 
        });
    }

    const apiKey = process.env.STABILITY_API_KEY;
    
    if (!apiKey) {
        return res.status(501).json({ error: 'Stability Credentials missing', useFallback: true });
    }

    // ──────────────── HYBRID API LOGIC (POLLING HANDLER) ────────────────
    if (predictionId) {
        // Polling Phase for Stability AI Audio
        try {
            const pollRes = await fetch(`https://api.stability.ai/v2beta/results/${predictionId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Accept': 'audio/*' // Fetching the raw audio bytes directly!
                }
            });

            if (pollRes.status === 202) {
                // Still processing
                return res.status(200).json({ status: 'processing', predictionId });
            } else if (pollRes.status === 200) {
                // Formatting payload buffer back to base64 for the frontend
                const arrayBuffer = await pollRes.arrayBuffer();
                const base64Data = Buffer.from(arrayBuffer).toString('base64');
                const audioUrl = `data:audio/wav;base64,${base64Data}`;
                
                return res.status(200).json({ status: 'succeeded', output: audioUrl });
            } else {
                let errText = '';
                try { errText = await pollRes.text(); } catch(e){}
                console.error("Stability Polling Error:", errText);
                return res.status(500).json({ error: `Polling failed: ${pollRes.status} ${errText}`, useFallback: true });
            }
        } catch (e) {
            console.error('Polling Error:', e);
            return res.status(500).json({ error: 'Polling Exception in Server', useFallback: true });
        }
    } 
    
    // ──────────────── HYBRID API LOGIC (INITIATION HANDLER) ────────────────
    if (prompt) {
        try {
            // Stability AI accepts multipart/form-data for audio generation natively 
            const formData = new FormData();
            formData.append("prompt", prompt);
            
            const initRes = await fetch('https://api.stability.ai/v2beta/stable-audio/generate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Accept': 'application/json' 
                },
                body: formData
            });
            
            const data = await initRes.json();
            
            if (initRes.status === 200 && data.id) {
                // Success: Returns the task ID for the frontend to poll
                return res.status(200).json({ predictionId: data.id, status: 'processing' });
            } else {
                console.error("Stability API Init Error:", data);
                
                // VERBOSE DEBUGGING FOR THE UI
                const keySnippet = apiKey ? `${apiKey.substring(0,4)}...${apiKey.substring(apiKey.length-4)}` : 'missing';
                const dbgMsg = `Stability Init Error: ${data.message || initRes.statusText}. Key used: ${keySnippet}`;
                return res.status(500).json({ error: dbgMsg, useFallback: true });
            }
        } catch (e) {
            console.error('Init Request Error:', e);
            return res.status(500).json({ error: 'Server Init Exception', useFallback: true });
        }
    }
    
    return res.status(400).json({ error: 'Invalid request', useFallback: true });
}
