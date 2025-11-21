
require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const PORT = 3000;

// ========================
// 1️⃣ CONNECT MYSQL
// ========================
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

// ========================
// 2️⃣ SEND EMAIL API ROUTE
// ========================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,              // ❗ IMPORTANT → false for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false // BigRock requires this sometimes
      }
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Message from Website",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.json({ success: true, message: "Email sent!" });

  } catch (err) {
    console.log("EMAIL ERROR:", err);
    res.json({ success: false, message: "Email failed", error: err });
  }
});

// ========================
// 3️⃣ SERVER START
// ========================
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
