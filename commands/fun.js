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

const fs = require('fs');
const path = require('path');
const quotesPath = path.join(__dirname, '..', 'lib', 'Quotes.json');


//......................................................

cmd({
  pattern: "قصيدة",
  desc: "يرسل قصيدة عشوائية",
  category: "fun",
  filename: __filename,
}, async (Void, citel, text) => {
  const poetry = require('./lib/poetry');
  const randomPoem = poetry.getRandomPoem();
  return citel.reply(`**${randomPoem.content}\n\n- ${randomPoem.poet}**`);
});
//......................................................


cmd({
  pattern: "مقولات",
  desc: "يرسل مقولة",
  category: "fun",
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
        category: "fun",
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
    //---------------------------------------------------------------------------
    cmd({
        pattern: "عرف",
        desc: "urban dictionary.",
        category: "fun",
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
)
