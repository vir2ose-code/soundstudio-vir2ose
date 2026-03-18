export default async function handler(req, res) {
  const IS_AI_ENABLED = false; // KI bleibt deaktiviert

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey) {
    console.error("Fehler: MAILERLITE_API_KEY fehlt in den Umgebungsvariablen!");
    return res.status(500).json({ error: 'Konfigurationsfehler auf dem Server' });
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'MailerLite Fehler');

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Abo-Fehler:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
