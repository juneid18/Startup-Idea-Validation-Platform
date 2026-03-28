// Write nodemailer code to send email to user when they sign up or reset password
import nodemailer from "nodemailer";
import dns from "dns";

// Force IPv4 DNS resolution globally for this module to avoid ENETUNREACH on IPv6
dns.setDefaultResultOrder("ipv4first");

export const sendEmail = async (to, subject, text) => {
  try {
    const host = process.env.EMAIL_HOST || "smtp.gmail.com";
    // Default to port 587 (STARTTLS) — more reliable than 465 (SSL) on most networks
    const port = Number(process.env.EMAIL_PORT || 587);
    // secure: false + requireTLS: true = STARTTLS (upgrades connection after handshake)
    // Only use secure: true if port is explicitly set to 465 in env
    const secure = process.env.EMAIL_SECURE === "true";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 15000,
      socketTimeout: 15000,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
};
