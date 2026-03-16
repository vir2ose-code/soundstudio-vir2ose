/**
 * Vercel Serverless Function: MailerLite Subscription Handler
 * Securely uses MAILERLITE_API_KEY from environment variables.
 */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;
    const apiKey = process.env.MAILERLITE_API_KEY;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (!apiKey) {
        console.error('MAILERLITE_API_KEY is not set in Vercel environment.');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    try {
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                email: email,
                groups: ['149811802925205466'], // Updated to use the form ID as group if needed, or user specified group
                status: 'active'
            })
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ message: 'Success', id: data.data.id });
        } else {
            console.error('MailerLite API error:', data);
            return res.status(response.status).json({ message: data.message || 'MailerLite subscription failed' });
        }
    } catch (error) {
        console.error('Subscription handler error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
