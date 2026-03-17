const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: 'Message received! We will get back to you soon.' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET all contact submissions (admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
