const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.checkdomain.de',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`,
            replyTo: email,
            to: 'studio@goldenmirror.online',
            subject: `Web Inquiry: ${subject || 'No Subject'}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: sans-serif; color: #333;">
                    <h2>Neues Kontaktformular Ticket</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Betreff:</strong> ${subject}</p>
                    <hr>
                    <p><strong>Nachricht:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully!' });

    } catch (error) {
        console.error('SMTP Error:', error);
        return res.status(500).json({ message: 'Failed to send email.' });
    }
}
