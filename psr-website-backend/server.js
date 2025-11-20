require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const PORT = 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL connected successfully!");
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Backend working and MySQL connected!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


