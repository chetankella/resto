require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Menu = require('../models/Menu');
const menuItems = require('./menuData');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/raja_vaari_vindhu';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Menu.deleteMany({});
    console.log('🗑️  Cleared existing menu items');

    await Menu.insertMany(menuItems);
    console.log(`🌱 Seeded ${menuItems.length} menu items successfully`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
