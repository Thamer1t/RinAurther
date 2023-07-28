const {cmd } = require('../lib')
cmd({
        pattern: "انستا",
        desc: "يحمل بوست انستاقرام",
        category: "تحميل",
        filename: __filename
    },
    async(Void, citel,text,{isCreator}) => {
        const { Insta } = require('../lib')
if(!text) return citel.reply('رابط البوست؟')
let response = await Insta(text)
for (let i=0;i<response.length;i++) {
await Void.sendFileUrl(citel.chat, response[i], `*تم التحميل، استمتع*`, citel)
}
    });
