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

const os = require('os')
const moment = require("moment-timezone")
const fs = require("fs")
const Config = require('../config')
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix, sck1 } = require("../lib");
const long = String.fromCharCode(8206)
const readmore = long.repeat(4001)
const Secktor = require('../lib/commands')

    //---------------------------------------------------------------------------
Secktor.cmd({
    pattern: "اوامر",
    alias: ["menu"],
    desc: "Help list",
    category: "عام",
    react: "✨",
    filename: __filename
},
async(Void, citel, text) => {
    const { commands } = require('../lib');
    if (text.split(" ")[0]) {
        let arr = [];
        const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
        if (!cmd) return await citel.reply("*❌مافيه امر كذا*");
        else arr.push(`*🍁الامر:* ${cmd.pattern}`);
        if (cmd.category) arr.push(`*🧩التصنيف:* ${cmd.category}`);
        if (cmd.alias) arr.push(`*🧩يسمى ايضا:* ${cmd.alias}`);
        if (cmd.desc) arr.push(`*🧩الوصف:* ${cmd.desc}`);
        if (cmd.use) arr.push(`*〽️الاستخدام:*\n \`\`\`${prefix}${cmd.pattern} ${cmd.use}\`\`\``);
        return await citel.reply(arr.join('\n'));
    } else {
        const cmds = {}
        commands.map(async(command, index) => {
            if (command.dontAddCommandList === false && command.pattern !== undefined) {
                if (!cmds[command.category]) cmds[command.category] = []
                cmds[command.category].push(command.pattern)
            }
        })
        const time = moment(moment())
            .format('HH:mm:ss')
        moment.tz.setDefault('Asia/Riyadh')
            .locale('id')
        const date = moment.tz('Asia/Riyadh').format('DD/MM/YYYY')
        let total = await sck1.countDocuments()
        let str = `───〔 ` + fancytext(Config.ownername.split(' ')[0], 58) + ` 〕───\n`
        str += '' + `\n` + ''
        for (const category in cmds) {
            str += `*╮*────〄 ${tiny(category)} 〄────*╭* \n`;
            if (text.toLowerCase() == category.toLowerCase()){
                str = `*╮*────〄 ${tiny(category)} 〄────*╭*  \n`;
                for (const plugins of cmds[category]) {
                    str += `│ ${fancytext(plugins,1)} │\n`;
                }
                str += `═══════════════⊷\n`;
                break;
            }
            else {
                for (const plugins of cmds[category]) {
                    str += `│ ${fancytext(plugins,1)} │\n`;
                }
                str += `═══════════════⊷\n`;
            }
        }
        str += `*⭐️:* _${prefix} ${prefix}\n*AURTHER* `;
        const buttonMessage = {
            image: {
                url: await botpic()
            },
            caption: str
        };
        return await Void.sendMessage(citel.chat, buttonMessage);
    }
})
    //---------------------------------------------------------------------------
Secktor.cmd({
            pattern: "قائمة",
            desc: "list menu",
            category: "عام"
        },
        async(Void, citel) => {
            const { commands } = require('../lib');
            let str = `
╭━━〘 ` + fancytext(Config.ownername.split(' ')[0], 58) + ` 〙━━──⊷`
            str += `
┃ ⛥╭──────────────      
┃ ⛥│ اليوزر: ${citel.pushName}
┃ ⛥│ البوت: ${tlang().title}
┃ ⛥│ رمز التفعيل: ${prefix}
┃ ⛥│ المالك: ${Config.ownername}
┃ ⛥│ الاوامر: ${commands.length}
┃ ⛥│ وقت التشغيل: ${runtime(process.uptime())}
┃ ⛥│ الذاكرة: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
┃ ⛥│  
┃ ⛥╰───────────
╰━━━━━━━━━━━──⊷\n`
for (let i = 0; i < commands.length; i++) 
{
     if(commands[i].pattern==undefined) continue
     str +=       `╭ ${i+1} *${fancytext(commands[i].pattern,1)}*\n` 
     if(commands[i].desc=undefined) commands[i].desc=""
     str += `╰➛ ${fancytext(commands[i].desc,1)}\n`
}
            return await Void.sendMessage(citel.chat, { image: { url: THUMB_IMAGE }, caption: str })
        }
    )
    //---------------------------------------------------------------------------
Secktor.cmd({
        pattern: "المالك",
        desc: "To find owner number",
        category: "معلومات المالك",
        react: "🐐",
        filename: __filename
    },
    async(Void, citel) => {
        const Config = require('../config')
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + Config.ownername + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + '\n' +
            'END:VCARD'
        let buttonMessaged = {
            contacts: { displayName: Config.ownername, contacts: [{ vcard }] },
            contextInfo: {
                externalAdReply: {
                    title: Config.ownername,
                    body: 'Touch here.',
                    renderLargerThumbnail: true,
                    thumbnailUrl: ``,
                    thumbnail: log0,
                    mediaType: 2,
                    mediaUrl: '',
                    sourceUrl: `https://wa.me/+` + owner[0] + '?text=أهلا!، انا ' + citel.pushName,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)


Secktor.cmd({
    pattern: "ملف",
    desc: "to get extact name where that command is in repo.\nSo user can edit that.",
    category: "للمالك",
    react: "✨",
    filename: __filename
},
async(Void, citel, text) => {
 const { commands } = require('../lib');
 let arr = [];
        const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
        if (!cmd) return await citel.reply("*❌هذا الامر غير موجود*");
        else arr.push(`*🍁الامر:* ${cmd.pattern}`);
        if (cmd.category) arr.push(`*🧩النوع:* ${cmd.category}`);
        if(cmd.filename) arr.push(`✨اسم الملف: ${cmd.filename}`)
        return citel.reply(arr.join('\n'));


})
