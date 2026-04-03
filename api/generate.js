// /api/generate.js
// Vercel Serverless Function for Azure OpenAI gpt-audio-1.5

const ENABLE_AI_GENERATION = false; // Sicherheits-Modus: Strikt auf false!

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    // Safely return Fallback immediately to keep CPU idle (< 3%)
    if (!ENABLE_AI_GENERATION) {
        return res.status(200).json({ useFallback: true });
    }

    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT; 
    
    if (!apiKey || !endpoint) {
        return res.status(501).json({ error: 'Azure Credentials missing', useFallback: true });
    }

    const { prompt, predictionId } = req.body;

    if (predictionId) {
        // Polling not supported for sync Azure API, return error if accidentally called
        return res.status(400).json({ error: 'Polling not applicable for Azure Sync', useFallback: true });
    } 
    
    if (prompt) {
        try {
            // "Die deployment-id aus der URL: gpt-audio-1.5"
            const deploymentName = 'gpt-audio-1.5';
            // Azure nutzt chat/completions für die Audio-Modelle (gpt-4o-audio-preview / gpt-audio-1.5)
            const apiVersion = '2024-02-15-preview'; 
            
            let targetUrl = '';
            // Robust parsing in case the user pasted the entire URL into the endpoint variable
            if (endpoint.includes('/openai/deployments/')) {
                targetUrl = endpoint;
            } else {
                const cleanEndpoint = endpoint.replace(/\/$/, ""); // Remove trailing slash
                targetUrl = `${cleanEndpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
            }
            
            const azurePayload = {
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: prompt
                            }
                        ]
                    }
                ],
                modalities: ["audio", "text"],
                audio: {
                    voice: "alloy",
                    format: "wav"
                }
            };

            const postResponse = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'api-key': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(azurePayload)
            });
            
            const data = await postResponse.json();
            
            if (!postResponse.ok || data.error) {
                console.error("Azure API Error:", data);
                // VERBOSE DEBUGGING FOR THE UI TO HELP USER FIX VERCEL
                const keySnippet = apiKey ? `${apiKey.substring(0,4)}...${apiKey.substring(apiKey.length-4)}` : 'missing';
                const dbgMsg = `Azure Error: ${data.error?.message || postResponse.statusText}. Target: ${targetUrl}. Key used: ${keySnippet}`;
                return res.status(500).json({ error: dbgMsg, useFallback: true });
            }
            
            // Azure returns the audio as base64 in the choices array
            const audioBase64 = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.audio ? data.choices[0].message.audio.data : null;
            if (!audioBase64) {
                return res.status(500).json({ error: 'No audio data returned from Azure', useFallback: true });
            }

            const audioUrl = `data:audio/wav;base64,${audioBase64}`;
            
            // Return synchronously formatted as "succeeded" to trick frontend into instantly loading it!
            return res.status(200).json({ status: 'succeeded', output: audioUrl });
        } catch (e) {
            console.error('Init Error:', e);
            return res.status(500).json({ error: 'Init failed', useFallback: true });
        }
    }
    
    return res.status(400).json({ error: 'Invalid request', useFallback: true });
}
