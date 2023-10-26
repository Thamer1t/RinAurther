/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/
const { dare, truth, random_question } = require('../lib/truth-dare.js');
const axios = require('axios');
const { cmd } = require('../lib');
const { getRandomPoem } = require('../lib/poetry.js');
const fs = require('fs');
const path = require('path');
const quotesPath = path.join(__dirname, '..', 'lib', 'Quotes.json');


//......................................................

cmd({
  pattern: "ارسم",
  desc: "يرسم صورة تتعلق بالكلمات المعطاة",
  category: "ترفيه",
  filename: __filename,
},
async (match, citel) => {
  // Get the prompt from the user input
  const prompt = citel.body.slice(6).trim();

  if (!prompt) {
    await citel.reply("يجب عليك تحديد ما تريد رسمه.");
    return;
  }

  // Call the DALL-E API to generate an image based on the prompt
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "image-alpha-001",
        prompt: `Draw a picture of ${prompt}`,
        num_images: 1,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Get the URL of the generated image
    const imageUrl = response.data.data[0].url;

    // Send the image to the user
    await citel.reply(`تم رسم الصورة الخاصة بـ "${prompt}"`);
    await citel.sendFileFromUrl(imageUrl);
  } catch (err) {
    console.error(err);
    await citel.reply("حدث خطأ أثناء رسم الصورة. يرجى المحاولة مرة أخرى.");
  }
});
//......................................................
const Poetry = require('../lib/database/Poetry.js');


cmd({
  pattern: "قصيدة",
  desc: "يرسل قصيدة عشوائية",
  category: "ترفيه",
  filename: __filename,
}, async(Void, citel, text) => {



  const count = await Poetry.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const poem = await Poetry.findOne().skip(randomIndex);


  citel.reply(`${poem.content}\n\n- ${poem.poet}`);
})




function tlang() {
  return {
    owner: "خاص ب آرثر",
    addPoemSuccess: "تم إضافة القصيدة بنجاح!",
    addPoemError: "حدث خطأ أثناء إضافة القصيدة. يرجى المحاولة مرة أخرى.",
    addPoemMissingFields: "الرجاء تحديد محتوى القصيدة واسم الشاعر",
    addPoemReplyToMsg: "الرجاء الرد على رسالة لإضافة قصيدة جديدة",
  };
}

cmd({
  pattern: "أضف_قصيدة",
  desc: "يضيف قصيدة جديدة إلى قاعدة البيانات",
  category: "للمالك",
  filename: __filename,
},
async (match, citel, text, { isCreator }) => {
  // Check if the user is the owner of the bot
  if (!isCreator) {
    citel.reply(tlang().owner);
    return;
  }



  // Split text by hyphen and extract content and poet fields
  const [content, poet] = text.split("-").map((field) => field.trim());

  // Check if both content and poet are provided
  if (!content || !poet) {
    citel.reply(tlang().addPoemMissingFields);
    return;
  }

  // Create a new Poetry document and save it to the database
  const poem = new Poetry({
    content,
    poet,
  });
  try {
    await poem.save();
    citel.reply(tlang().addPoemSuccess);
  } catch (err) {
    console.error(err);
    citel.reply(tlang().addPoemError);
  }
});
//..........................................................


cmd({
  pattern: "مقولات",
  desc: "يرسل مقولة",
  category: "ترفيه",
  filename: __filename,
}, async (Void, citel, text) => {
  const quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));
  console.log('Parsed quotes:', quotes);
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  console.log('Random quote:', randomQuote);
  return citel.reply(`** ${JSON.stringify(randomQuote)}\n\n*Powered by غومونريونغ*`);
});
    //---------------------------------------------------------------------------
    cmd({
        pattern: "حقيقة",
        desc: "Sends quotes in chat.",
        category: "ترفيه",
        filename: __filename,
    },
    async(Void, citel, text) => {
        var quoo = await axios.get(`https://waqi3arabiya.com/api/quotes/random`)
        const replyf = `
╔════◇
║ *🎗️الحقيقة:* ${quoo.data.quote.body}
║ *:* ${quoo.data.quote.author}
║    
╚════════════╝ `
return citel.reply(replyf)
    }

)

  /* cmd({
        pattern: "عرف",
        desc: "urban dictionary.",
        category: "بحث",
        filename: __filename,
    },
    async(Void, citel, text) => {
        try{
            let { data } = await axios.get(`https://www.ionomy.com/api/v1/bilingual?format=json&term=${text}`)
            var textt = `
            Word: ${text}
            Definition: ${data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}
            Example: ${data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}`
            return citel.reply(textt)
                    } catch {
                        return citel.reply(`ماحصلت نتائج ل ${text}`)
                    }
    }
)*/
