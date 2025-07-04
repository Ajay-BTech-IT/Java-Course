// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// app.use(cors());
app.use(cors({
  origin: "https://java-course-frontend.onrender.com " // Or use "*" for testing
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Send enrollment email to admin + auto-reply to user
app.post('/enroll', async (req, res) => {
  const { name, email, phone, degree, department, college } = req.body;

  // Email to YOU (admin)
  const mailOptionsToAdmin = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'New Enrollment in Java Course',
    html: `
      <h2>New Enrollment</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Degree:</strong> ${degree}</p>
      <p><strong>Department:</strong> ${department}</p>
      <p><strong>College:</strong> ${college}</p>
    `,
  };

  // Auto-reply email to USER
  const mailOptionsToUser = {
    from: process.env.EMAIL,
    to: email, // User's email
    subject: 'Thank You for Enrolling in Java Course!',
    html: `
      <h2>Hi ${name},</h2>
      <p>You've just enrolled in the Java Course — you've made a great move!</p>
      <p>Stay tuned. We'll contact you soon.</p>
      <p>Best regards,<br/>Code With Spidy 🕷️</p>
    `,
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptionsToAdmin),
      transporter.sendMail(mailOptionsToUser)
    ]);

    res.status(200).json({ message: 'Enrollment received and confirmation sent!' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});