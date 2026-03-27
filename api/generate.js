// /api/generate.js
// Vercel Serverless Function for Replicate Audio Generation Polling
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    // Load the user's secret Replicate Token
    const apiKey = process.env.REPLICATE_API_TOKEN;
    if (!apiKey) {
        return res.status(501).json({ error: 'REPLICATE_API_TOKEN missing', useFallback: true });
    }

    const { prompt, predictionId } = req.body;

    if (predictionId) {
        // === POLLING LOGIC ===
        // The frontend periodically asks us if the Replicate task is finished.
        try {
            const getResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
                headers: { 'Authorization': `Token ${apiKey}` }
            });
            const data = await getResponse.json();
            return res.status(200).json(data); 
        } catch (e) {
            console.error('Polling Error:', e);
            return res.status(500).json({ error: 'Polling failed' });
        }
    } 
    
    if (prompt) {
        // === INITIALIZATION LOGIC ===
        // We tell Replicate to start processing the prompt on Meta's MusicGen.
        try {
            const postResponse = await fetch('https://api.replicate.com/v1/predictions', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    version: "671ac645ce5e552cc63a54a2bbff63fcf7980430f5d50ce73ee1ee8cc6144e58",
                    input: {
                        prompt: prompt,
                        model_version: "stereo-chord",
                        duration: 8
                    }
                })
            });
            
            const data = await postResponse.json();
            
            if (!postResponse.ok || data.error || data.detail) {
                console.error("Replicate API Error:", data);
                return res.status(500).json({ error: data.detail || data.error || 'Unknown Replicate Error' });
            }
            
            // Return the task ID immediately so Vercel doesn't hit the 10-second timeout!
            return res.status(200).json({ predictionId: data.id });
        } catch (e) {
            console.error('Init Error:', e);
            return res.status(500).json({ error: 'Init failed' });
        }
    }

    return res.status(400).json({ error: 'Invalid request body' });
}
