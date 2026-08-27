const Message = require("../models/Message");
const transporter = require("../config/mailer");

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const saved = await Message.create({ name, email, message });

    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: `New portfolio message from ${name}`,
        text: `From: ${name} (${email})\n\n${message}`,
      },
      (err) => {
        if (err) console.log("Email send error:", err.message);
      }
    );

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createMessage, getMessages };