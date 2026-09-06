// lib/mailer.js
import nodemailer from 'nodemailer';

// Always sends real email via SMTP -- no console/dev fallback, so there's
// never ambiguity in production about whether an OTP was actually sent.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,         // e.g. smtp-relay.brevo.com
  port: Number(process.env.EMAIL_PORT), // e.g. 587
  secure: false,                        // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection on startup so a bad SMTP config fails loudly in logs.
transporter.verify((err) => {
  if (err) console.error("❌ SMTP failed:", err.message);
  else console.log("✅ SMTP is working");
});

/**
 * Sends a plain text email.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body in plain text
 */
export async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    text
  });
}

// Keep default export for compatibility
export default transporter;
