import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load env from server/.env explicitly so it works no matter the cwd
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'mail', time: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }
    // Basic email format check
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      return res.status(400).json({ ok: false, error: 'Invalid email' });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      TO_EMAIL,
      FROM_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !TO_EMAIL) {
      return res.status(500).json({ ok: false, error: 'Server mail configuration is incomplete' });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    // Verify SMTP configuration early for clearer errors
    try {
      await transporter.verify();
    } catch (verifyErr) {
      console.error('SMTP verify failed:', verifyErr?.code || verifyErr?.message || verifyErr);
      return res.status(500).json({ ok: false, error: 'SMTP connection failed. Check SMTP_HOST/PORT/USER/PASS.' });
    }

    const subject = `New message from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    const info = await transporter.sendMail({
      from: FROM_EMAIL || SMTP_USER,
      to: TO_EMAIL,
      subject,
      text,
      replyTo: email,
    });

    res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    const summary = [err?.code, err?.response?.toString?.() || err?.message].filter(Boolean).join(' - ');
    console.error('Contact error:', summary || err);
    res.status(500).json({ ok: false, error: summary || 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
