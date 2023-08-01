const mongoose = require('mongoose');
const AnimeName = require('../lib/database/Animenames');

// Replace the connection string with your own MongoDB URI


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
