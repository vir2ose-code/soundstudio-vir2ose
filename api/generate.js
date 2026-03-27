// /api/generate.js
export default async function handler(req, res) {
    const apiKey = process.env.REPLICATE_API_TOKEN;
    if (!apiKey) return res.status(501).json({ error: 'REPLICATE_API_TOKEN missing' });

    if (req.body.prompt === "debug_probe") {
        try {
            // Probe 1: Models Endpoint metadata
            const getModel = await fetch('https://api.replicate.com/v1/models/meta/musicgen', {
                headers: { 'Authorization': `Bearer ${apiKey}` }
            });
            const modelData = await getModel.json();
            
            // Probe 2: Try running the most robust simple payload
            const postTest = await fetch('https://api.replicate.com/v1/predictions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    version: "b05b1dff1d8c6b63d14b0faa5d59e6af84057a412221ebee460c1d1a1b1b0b00",
                    input: { prompt: "test" }
                })
            });
            const postData = await postTest.json();

            return res.status(200).json({ modelData, postData });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    }
    return res.status(400).json({ error: "Probe sleeping" });
}
