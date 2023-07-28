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

const axios = require('axios')
const { sck1, tiny, fancytext, listall,cmd,ffmpeg } = require('../lib/')
const fs = require('fs-extra');
const { exec } = require('child_process')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");

    //---------------------------------------------------------------------------
    cmd({
        pattern: "صورة",
        desc: "Makes photo of replied sticker.",
        category: "converter",
        use: '<reply to any gif>',
        filename: __filename
    },
    async(Void, citel, text) => {
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
        if (!citel.quoted) return citel.reply(`رد على اي ملصق`)
        let mime = citel.quoted.mtype
if (mime =="imageMessage" || mime =="stickerMessage")
{
        let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
        let name = await getRandom('.png')
        exec(`ffmpeg -i ${media} ${name}`, (err) => {
            let buffer = fs.readFileSync(media)
            Void.sendMessage(citel.chat, { image: buffer }, { quoted: citel })
          
         fs.unlink(media, (err) => {
         if (err) { return console.error('File Not Deleted from From TOPHOTO AT : ' , media,'\n while Error : ' , err);  }
         else return console.log('File deleted successfully in TOPHOTO  at : ' , media);
         });
         
        })
        
} else return citel.reply ("```لازم الستيكر يكون ثابت مو متحرك```")
    }
)
//---------------------------------------------------------------------------

cmd({
         pattern: "vv",
         alias : ['viewonce','retrive'],
         desc: "Flips given text.",
         category: "misc",
         use: '<query>',
         filename: __filename
     },
     async(Void, citel, text) => {
try {
const quot = citel.msg.contextInfo.quotedMessage.viewOnceMessageV2;
if(quot)
{
if(quot.message.imageMessage) 
{ console.log("Quot Entered") 
   let cap =quot.message.imageMessage.caption;
   let anu = await Void.downloadAndSaveMediaMessage(quot.message.imageMessage)
   return Void.sendMessage(citel.chat,{image:{url : anu},caption : cap })
}
if(quot.message.videoMessage) 
{
   let cap =quot.message.videoMessage.caption;
   let anu = await Void.downloadAndSaveMediaMessage(quot.message.videoMessage)
   return Void.sendMessage(citel.chat,{video:{url : anu},caption : cap })
}
 
}
//else citel.reply("```ليست رسالة قراءة مرة واحدة```") 
       
}  
     
catch(e) {  console.log("error" , e ) }     

       
if(!citel.quoted) return citel.reply("```رد على رسالة قراءة مره واحدة```")           
if(citel.quoted.mtype === "viewOnceMessage")
{ console.log("ViewOnce Entered") 
 if(citel.quoted.message.imageMessage )
{ 
  let cap =citel.quoted.message.imageMessage.caption;
  let anu = await Void.downloadAndSaveMediaMessage(citel.quoted.message.imageMessage)
  Void.sendMessage(citel.chat,{image:{url : anu},caption : cap })
}
else if(citel.quoted.message.videoMessage )
{
  let cap =citel.quoted.message.videoMessage.caption;
  let anu = await Void.downloadAndSaveMediaMessage(citel.quoted.message.videoMessage)
  Void.sendMessage(citel.chat,{video:{url : anu},caption : cap })
}

}
else return citel.reply("```ليست رسالة قراءة مرة واحدة```")

})    //---------------------------------------------------------------------------
cmd({
            pattern: "مقولة",
            desc: "Makes Sticker of quoted text.",
            alias: ["q"],
            category: "converter",
            use: '<reply to any message.>',
            filename: __filename
        },
        async(Void, citel, text) => {
            if (!citel.quoted) return citel.reply("رد على اي رسالة");
            let textt = citel.quoted.text;
            let pfp;
            try {
                pfp = await Void.profilePictureUrl(citel.quoted.sender, "image");
            } catch (e) {
                pfp = THUMB_IMAGE;
            }
            let todlinkf = ["#FFFFFF", "#000000"];
            let todf = todlinkf[Math.floor(Math.random() * todlinkf.length)];
            let username = await sck1.findOne({ id: citel.quoted.sender })
            var tname;
            if (username.name && username.name !== undefined) {
                tname = username.name
            } else {
                tname = Void.getName(citel.quoted.sender)
            }
            let body = {
                type: "quote",
                format: "png",
                backgroundColor: todf,
                width: 512,
                height: 512,
                scale: 3,
                messages: [{
                    avatar: true,
                    from: {
                        first_name: tname,
                        language_code: "ar",
                        name: tname,
                        photo: {
                            url: pfp,
                        },
                    },
                    text: textt,
                    replyMessage: {},
                }, ],
            };
            let res = await axios.post("https://bot.lyo.su/quote/generate", body);
            let img = Buffer.alloc(res.data.result.image.length, res.data.result.image, "base64");
            return citel.reply(img,{packname:'غومونريونغ',author:'مقولة'},"sticker")

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "زخرفة",
            desc: "Makes stylish/fancy given text",
            category: "converter",
            use: '56 Rin',
            react: "✅",
            filename: __filename
        },
        async(Void, citel, text) => {
            if (isNaN(text.split(" ")[0]) || !text) {
                let text = tiny(
                    "زخرفة \n\مثال: .زخرفة 32 Rin\n\n"
                );
                listall("Rin").forEach((txt, num) => {
                    text += `${(num += 1)} ${txt}\n`;
                });
                return await citel.reply(text);
            }

            let fancytextt = await fancytext(`${text.slice(2)}`, text.split(" ")[0])
            citel.reply(fancytextt)

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "رابط",
            desc: "Makes url tiny.",
            category: "converter",
            use: '<url>',
            react: "✅",
            filename: __filename
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply('Provide me a link')
            try {
                link = text.split(" ")[0];
                anu = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`);
                citel.reply(`*🛡️Your Shortened URL*\n\n${anu.data}`);
            } catch (e) {
                console.log(e);
            }
        }
    )
    //---------------------------------------------------------------------------
 
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

cmd({
    pattern: "صوت",
    alias:['mp3','tomp3'],
    desc: "changes type to audio.",
    category: "converter",
    use: '<reply to any Video>',
    filename: __filename
},
async(Void, citel, text) => {
    if (!citel.quoted) return citel.reply(`_Reply to Any Video_`);
    let mime = citel.quoted.mtype
if (mime =="audioMessage" || mime =="videoMessage")
{
    let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
     const { toAudio } = require('../lib');
     let buffer = fs.readFileSync(media);
    let audio = await toAudio(buffer);
    Void.sendMessage(citel.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: citel });
 

fs.unlink(media, (err) => {
if (err) { return console.error('File Not Deleted from From TOAUDIO AT : ' , media,'\n while Error : ' , err);  }
else return console.log('File deleted successfully in TOAUDIO MP3 at : ' , media);
});

}
else return citel.reply ("```رد على فيديو```")
}
)
