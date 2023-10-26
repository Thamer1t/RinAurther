/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
  * @author : @samapndey001 <https://github.com/SamPandey001>
  * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

 const { sck,sck1,cmd, getBuffer, tlang, prefix } = require('../lib')
 const Config = require('../config')
 const eco = require('discord-mongoose-economy')
 const ty = eco.connect(mongodb);
// Set the cooldown time to 1 hour (in milliseconds)
const hourlyCooldownTime = 1 * 60 * 1000 // 1 hour in milliseconds
const cooldownTime = 5 * 60 * 1000 // 5 minutes in milliseconds
const cooldowns = new Map()
const hourly = {
  cooldowns: {}
}
 /*
  cmd({
         pattern: "economy",
         desc: "daily gold.",
         category: "economy",
     },
     */
     //---------------------------------------------------------------------------
  cmd({
         pattern: "تصفير",
         desc: "reset wallet of quoted user.",
         category: "اقتصاد",
         filename: __filename,
         react: "💷"
     },
     async(Void, citel, text,{ isCreator }) => {
        let zerogroup = (await sck.findOne({
            id: citel.chat,
        })) || (await new sck({
                id: citel.chat,
            })
            .save());
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false") return citel.reply("*🚦الإقتصاد* غير مفعل.");
	 if(!isCreator) return citel.reply(tlang().owner)
        let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
	if(!users) return citel.reply('Please give me user.')
        const balance  = await eco.balance(users, "secktor")
        await eco.deduct(users, "secktor", balance.wallet);
        return await citel.reply(`⛩️ User: @${users.split('@')[0]} \n *🧧 @${العضو.split('@')[0]} تم تصفير جميع النقود 🪙 التي في حسابة.*\n_تمت.🫡_`,{mentions:[users]})
 }
 )
    //---------------------------------------------------------------------------
     cmd({
        pattern: "كشف",
        desc: "check leaderboard.",
        category: "اقتصاد",
        filename: __filename,
        react: "💷"
    },
    async(Void, citel, text,{ isCreator }) => {
	let h = await eco.lb('secktor',100);
	let str = `*توب ${h.length}كشف الحسابات البنكية للأعضاء*\n`
	const { sck1 } = require('../lib');
	let arr = []
	 for(let i=0;i<h.length;i++){
            let username = await sck1.findOne({ id: h[i].userID })
            var tname;
            if (username.name && username.name !== undefined) {
                tname = username.name
            } else {
                tname = Void.getName(h[i].userID)
            }
str+= `*${i+1}*\n╭─────────────◆\n│ *الاسم:-* _${tname}_\n│ *اليوزر:-* _@${h[i].userID.split('@')[0]}_\n│ *المحفظة:-* _${h[i].wallet}_\n╰─────────────◆\n\n`  	 
	 arr.push(h[i].userID)
	 }
	     citel.reply(str,{mentions:arr})
	     
     })

cmd({
    pattern: "تحويل",
    desc: "transfer gold.",
    category: "اقتصاد",
    filename: __filename,
    react: "💷"
},
async(Void, citel, text,{ isCreator }) => {
    let zerogroup = (await sck.findOne({
        id: citel.chat,
    })) || (await new sck({
            id: citel.chat,
        })
        .save());
    let mongoschemas = zerogroup.economy || "false";
    if (mongoschemas == "false") return citel.reply("*🚦Economy* مو مفعل بالقروب، كلم القائد يفعله");
    let value = text.trim().split(" ");
    if (value[0] === "") return citel.reply(`Use ${prefix}transfer 100 @user`);
    let user = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    if(!user) return citel.reply('عطني يوزر احول له🤦‍♂️.');
    const secktor = "secktor"
        const user1 = citel.sender
        const user2 = user
        const word = value[0];
		const code = value[1];
        let d = parseInt(word)
		if (!d) return citel.reply("تاكد انك كاتب الامر صح👀");
        const balance = await eco.balance(user1, secktor);
        let a = (balance.wallet) < parseInt(word)
        //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        if(a == true) return citel.reply("ماعندك فلوس كافية تحولها👎");

        const deduct = await eco.deduct(user1, secktor, value[0]);
        const give = await eco.give(user2, secktor, value[0]);

return await citel.reply( `*📠 تم تحويل ${value[0]}  بنجاح💰*`)

}
)

     //---------------------------------------------------------------------------
     cmd({
        pattern: "محفظة",
        desc: "shows wallet.",
        category: "اقتصاد",
        filename: __filename,
        react: "💷"
    },
    async(Void, citel, text,{ isCreator }) => {
        let zerogroup = (await sck.findOne({
            id: citel.chat,
        })) || (await new sck({
                id: citel.chat,
            })
            .save());
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false") return citel.reply("*🚦Economy* مو مفعل بالقروب، كلم آرثر يفعله");
         const secktor = "secktor"
         const balance = await eco.balance(citel.sender, secktor); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
return await citel.reply(`*👛 ${citel.pushName}'s Purse:*\n\n_🪙${balance.wallet}_`)
    }
)
//---------------------------------------------------------------------------
     cmd({
        pattern: "منح",
        desc: "Add money in wallet.",
        category: "اقتصاد",
        filename: __filename,
        react: "💷"
    },
    async(Void, citel, text,{ isCreator }) => {
        if(!isCreator) return

         const secktor = "AURTHER"
         let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
         if(!users) return citel.reply('منشن اللي بتعطيه فلوس')
         await eco.give(users, secktor, parseInt(text.split(' ')[0]));
        return await Void.sendMessage(citel.chat,{text: `تمت اضافة 📈 ${parseInt(text.split(' ')[0])} الى محفظة @${users.split('@')[0]} 🛸.`,mentions:[users]},{quoted:citel})

    }
)

     //---------------------------------------------------------------------------


function cdl(duration) {
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} يوم${days > 1 ? '' : ''}`;
    } else if (hours > 0) {
        return `${hours} ساعة${hours > 1 ? '' : ''}`;
    } else if (minutes > 0) {
        return `${minutes} دقيقة${minutes > 1 ? '' : ''}`;
    } else {
        return `${seconds} ثانية${seconds > 1 ? '' : ''}`;
    }
}

     //---------------------------------------------------------------------------
    

 
