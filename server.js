const express = require("express");
require('dotenv').config();
const nodemailer = require("nodemailer");
const cors = require("cors");

const serverPort = process.env.PORT;
const gmailAddress = process.env.GMAIL
const appPassword= process.env.GMAIL_PASS
const serverUrl = process.env.PRODUCTION_URL
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("welcome to COMRADE porfolio")
})
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailAddress, 
    pass: appPassword, 
  },
});

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: gmailAddress,
    subject: `New Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(3000, () => console.log(`Server is currently running on ${serverUrl}`));