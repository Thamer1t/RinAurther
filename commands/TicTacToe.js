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

const { cmd, parseJid, getAdmin, tlang } = require("../lib/");
const eco = require('discord-mongoose-economy')
const ty = eco.connect(mongodb);

cmd(
  {
    pattern: "delttt",
    desc: "deletes TicTacToe running session.",
    filename: __filename,
    category: "game",
  },
  async (Void, citel, text, { isCreator }) => {
    if (!citel.isGroup) return citel.reply(tlang().group);
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel)
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if(!isAdmins && !isCreator) return citel.reply('خاص بالمشرفين والمالك!')
    this.game = this.game ? this.game : false
    if (Object.values(this.game).find((room) => room.id.startsWith("tictactoe"))) {
      delete this.game
      return citel.reply(`تم حذف اللعبة القائمة`);
    } else {
      return citel.reply(`لا يوجد لعبة قائمة🎮 `)
    }
  }
);

cmd(
  {
    pattern: "ttt",
    desc: "Play TicTacToe",
    filename: __filename,
    category: "game",
  },
  async (Void, citel, text) => {
    if (!citel.isGroup) return citel.reply(tlang().group);

    let { prefix } = require("../lib");
    let TicTacToe = require("../lib/ttt");
    this.game = this.game ? this.game : {};

    // Check if the user is already in a TicTacToe game
    if (Object.values(this.game).find((room) => [room.game.playerX, room.game.playerO].includes(citel.sender))) {
      return citel.reply("هناك لعبة قائمة بالفعل");
    }

    // Check if there is an existing game waiting for a player to join
    let room = Object.values(this.game).find(
      (room) =>
        room.id.startsWith("tictactoe") &&
        room.state === "انتظار" &&
        ![room.game.playerX, room.game.playerO].includes(citel.sender) &&
        (text ? room.name === text : true)
    );

    if (room) {
      room.o = citel.chat;
      room.game.playerO = citel.sender || citel.mentionedJid[0];
      room.state = "لعب";
      let arr = room.game.render().map((v) => {
        return {
          X: "❌",
          O: "⭕",
          1: "1️⃣",
          2: "2️⃣",
          3: "3️⃣",
          4: "4️⃣",
          5: "5️⃣",
          6: "6️⃣",
          7: "7️⃣",
          8: "8️⃣",
          9: "9️⃣",
        }[v];
      });
      let str = `
دور: @${room.game.currentTurn.split("@")[0]}
رمز الغرفة: ${room.id}
${arr.slice(0, 3).join("  ")}
${arr.slice(3, 6).join("  ")}
${arr.slice(6).join("  ")}
`;

      await Void.sendMessage(citel.chat, {
        text: str,
        mentions: [room.game.currentTurn],
      });
    } else {
      // Create a new game instance
      room = {
        id: "tictactoe-" + +new Date(),
        x: citel.chat,
        o: "",
        game: new TicTacToe(citel.sender, "o"),
        state: "انتظار",
      };
      if (text) room.name = text;
      citel.reply("بانتظار اللاعبين، استخدم: .ttt لدخول الغرفة ");
      this.game[room.id] = room;
    }
  }
);

cmd(
  {
    on: "text"
  }, if (!this.game) return;

    let room = Object.values(this.game).find(
      (room) =>
        room.id.startsWith("tictactoe") &&
        room.state === "لعب" &&
        [room.game.playerX, room.game.playerO].includes(citel.sender)
    );

    if (!room) return;

    let player = citel.sender === room.game.playerX ? "X" : "O";

    if (room.game.currentTurn !== citel.sender) return;

    if (!/^\d$/.test(text)) return;

    let box = parseInt(text);

    if (room.game.board[box - 1] !== "-") return;

    room.game.placeMark(box, player);

    let arr = room.game.render().map((v) => {
      return {
        X: "❌",
        O: "⭕",
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣",
      }[v];
    });

    let str = `
دور: @${room.game.currentTurn.split("@")[0]}
رمز الغرفة: ${room.id}
${arr.slice(0, 3).join("  ")}
${arr.slice(3, 6).join("  ")}
${arr.slice(6).join("  ")}
`;

    let winner = room.game.checkWinner();

    if (winner) {
      let user = await parseJid(winner);
      let userEco = await ty.findOne({ userID: user.jid });
      if (userEco) {
        userEco.wallet += 100;
        await userEco.save();
      }
      await Void.sendMessage(citel.chat, `الفائز هو: @${user.jid.split("@")[0]}!`);
      delete this.game[room.id];
    } else if (room.game.isTie()) {
      await Void.sendMessage(citel.chat, `تعادل!`);
      delete this.game[room.id];
    } else {
      await Void.sendMessage(citel.chat, {
        text: str,
        mentions: [room.game.currentTurn],
      });
    }
  }
);
  async (Void, citel, text) => {
cmd({ pattern: "ship" , category: "fun" }, async(Void, citel, text) => {
    const { tlang } = require('../lib')
   if (!citel.isGroup) return citel.reply(tlang().group);
   const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
	 const participants = citel.isGroup ? await groupMetadata.participants : "";
   let members = participants.map(u => u.id)
   const percentage = Math.floor(Math.random() * 100)
    async function couple(percent) {
         var text;
        if (percent < 25) {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\tمب مرة، لكن لا رال فيه امل !`
        } else if (percent < 50) {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t علاقتكم كويسه، اتوقع؟ 💫`
        } else if (percent < 75) {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t\tاستمروا يوما ما بتصيرون اعز الاصحاب ⭐️`
        } else if (percent < 90) {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\tاوبا!، خوتكم تنحسدون عليها💖 `
        } else {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\tانت الرفيق اللي على الطيب ممشاك، وانت الخوي اللي يساوي قبيلة 💙`
        }
        return text
        }
       var user = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
       var shiper;
       if (user) {
       shiper = user
       } else {
       shiper = members[Math.floor(Math.random() * members.length)]
       }
       let caption = `\t❣️ *ندور لك على صديق...* ❣️ \n`
        caption += `\t\t✯────────────────────✯\n`
        caption += `@${citel.sender.split('@')[0]}  x  @${shiper.split('@')[0]}\n`
        caption += `\t\t✯────────────────────✯\n`
        caption += await couple(percentage)
        if(citel.sender.split('@')[0]===shiper.split('@')[0]) return citel.reply('```'+'بتصير صديق نفسك... صاحي انت؟'+'```')
        await Void.sendMessage(citel.chat,{text: caption,mentions: [citel.sender,shiper]},{quoted:citel})
   }
)
// IDEA of Shipcent from => https://github.com/iamherok/WhatsApp-Botto-Ruka/blob/master/handler/message.js#L842
