require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const PORT = 3000;

// =========================
// MYSQL CONNECTION
// =========================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL connected successfully!");
  }
});

// =========================
// EMAIL ROUTE
// =========================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"Website Contact" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: "New Message from Website Contact Form",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Email sending failed", error: err });
  }
});

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("Backend working and MySQL connected!");
});

// =========================
// START SERVER
// =========================
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
