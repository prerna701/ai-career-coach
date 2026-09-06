// lib/mailer.js
import nodemailer from 'nodemailer';

const useConsoleBackend = process.env.EMAIL_BACKEND === 'console';

// Dev-mode transporter: logs the email instead of sending it, so local/testing
// environments work without real SMTP credentials.
const consoleTransporter = {
  sendMail: async ({ from, to, subject, text, html }) => {
    console.log('📧 [EMAIL_BACKEND=console] Email not actually sent:');
    console.log(`   From:    ${from}`);
    console.log(`   To:      ${to}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body:    ${text || html}`);
    return { messageId: 'console-backend' };
  },
};

const realTransporter = useConsoleBackend
  ? null
  : nodemailer.createTransport({
      host: process.env.EMAIL_HOST,         // e.g. smtp-relay.brevo.com
      port: Number(process.env.EMAIL_PORT), // e.g. 587
      secure: false,                        // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

if (realTransporter) {
  // Optional: verify connection on startup
  realTransporter.verify((err) => {
    if (err) console.error("❌ SMTP failed:", err.message);
    else console.log("✅ SMTP is working");
  });
}

const transporter = useConsoleBackend ? consoleTransporter : realTransporter;

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
