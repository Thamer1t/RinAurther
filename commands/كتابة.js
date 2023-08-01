const mongoose = require('mongoose');
const AnimeName = require('../lib/database/AnimeNames.js');
const axios = require('axios');
const { cmd } = require('../lib');
// Replace the connection string with your own MongoDB URI
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

// Define the command to get a random anime name from the database
cmd({
  pattern: "كت",
  desc: "Get a random anime name",
  category: "ترفيه",
  filename: __filename,
}, async (match, citel) => {
  try {
    const count = await AnimeName.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const anime = await AnimeName.findOne().skip(randomIndex);

    citel.reply(anime.name);
  } catch (error) {
    console.error(error);
    citel.reply('حدث خطأ، حاول مجددا');
  } finally {
    mongoose.disconnect();
  }
});
cmd({
  pattern: "اضافة-كت",
  desc: "Get a random anime name",
  category: "للمالك",
  filename: __filename,
}, async (match, citel, text, { isCreator }) => {
  // Check if the user is the owner of the bot
  if (!isCreator) {
    citel.reply(tlang().owner);
    return;
  }

  // Extract the new anime name from the command message
  const newAnimeName = text.trim();

  // Check if the new anime name is provided
  if (!newAnimeName) {
    citel.reply('الرجاء تحديد اسم الأنمي الجديد.');
    return;
  }

  // Create a new AnimeName document and save it to the database
  const animeName = new AnimeName({
    name: newAnimeName,
  });
  try {
    await animeName.save();
    citel.reply(`تمت إضافة ${newAnimeName} إلى قاعدة البيانات.`);
  } catch (err) {
    console.error(err);
    citel.reply('حدث خطأ أثناء إضافة اسم الأنمي إلى قاعدة البيانات. يرجى المحاولة مرة أخرى.');
  } finally {
    mongoose.disconnect();
  }
});

