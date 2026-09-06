require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// API Route for Service Requests
app.post("/api/service-request", async (req, res) => {
  const { name, phone, email, service, message } = req.body || {};
  
  if (!name || !phone || !service || !message) {
    return res.status(400).json({ message: "Please complete all required fields." });
  }

  // Demo fallback if env vars are missing
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("TEMIVIC SERVICE REQUEST (DEMO MODE):", { name, phone, email, service, message });
    return res.json({ message: "Received in demo mode." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE) === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL || process.env.SMTP_USER,
      replyTo: email ? `"${name}" <${email}>` : undefined, // Sets customer email as Reply-To
      subject: `New Service Request: ${service} - ${name}`,
      text: `You received a new service request from your website:\n\n` +
            `Name: ${name}\n` +
            `Phone: ${phone}\n` +
            `Email: ${email || "Not provided"}\n` +
            `Service Requested: ${service}\n\n` +
            `Message:\n${message}\n`
    });

    return res.json({ message: "Thank you! Your request has been sent successfully." });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return res.status(500).json({ message: "Unable to send request right now. Please try again later." });
  }
});

// Catch-all route for SPA / index fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// CloudLinux Passenger startup binding
if (typeof PhusionPassenger !== "undefined") {
  app.listen("passenger");
} else {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;