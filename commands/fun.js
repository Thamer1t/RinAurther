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

const { dare, truth, random_question } = require('../lib/truth-dare.js')
const axios = require('axios')
const { cmd } = require('../lib')
    //---------------------------------------------------------------------------

    //---------------------------------------------------------------------------

    //---------------------------------------------------------------------------

    //---------------------------------------------------------------------------
cmd({
        pattern: "حقيقة",
        desc: "Sends fact in chat.",
        category: "fun",
        filename: __filename,
    },
    async(Void, citel, text) => {
        const { data } = await axios.get(`https://waqi3arabiya.com/api/facts/random`)
        return citel.reply(`*Fact:* ${data.fact}\n\n*Powered by غومونريونغ*`)   
    }

)
    //---------------------------------------------------------------------------
    cmd({
        pattern: "مقولات",
        desc: "Sends quotes in chat.",
        category: "fun",
        filename: __filename,
    },
    async(Void, citel, text) => {
        var quoo = await axios.get(`https://waqi3arabiya.com/api/quotes/random`)
        const replyf = `
╔════◇
║ *🎗️المقولة:* ${quoo.data.quote.body}
║ *👤القائل:* ${quoo.data.quote.author}
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
