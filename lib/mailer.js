// lib/mailer.js
import nodemailer from 'nodemailer';

// Create the transporter once (using EMAIL_* env variables)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,         // e.g. smtp-relay.brevo.com
  port: Number(process.env.EMAIL_PORT), // e.g. 587
  secure: false,                        // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Optional: verify connection on startup
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
    from: process.env.EMAIL_USER, // Sender address
    to,
    subject,
    text
  });
}

// Keep default export for compatibility
export default transporter;
