const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
	config: {
		name: "info",
		version: "1.0",
		author: "NTKhang",
		countDown: 20,
		role: 0,
		shortDescription: { vi: "", en: "" },
		longDescription: { vi: "", en: "" },
		category: "owner",
		guide: { en: "" },
		envConfig: {}
	},

	onStart: async function ({ message }) {
		const ownerInfo = {
			name: " 𝑶𝒃𝒊𝒕𝒐 𝑼𝒄𝒉𝒊𝒉𝒂❟❛❟ ",  // Updated Name
			age: "『 16+ 』",
			status: "⩸__🆂🅸🅽🅶🅻🅴__⩸",
			whatsapp: "01888240943",
			facebook: "iccha nai amar😫",
			messenger: "nai Jah Vhag🙂"
		};

		const botInfo = {
			name: global.GoatBot.config.nickNameBot,
			prefix: global.GoatBot.config.prefix
		};

		const videoLink = "https://i.imgur.com/6jNIPSg.mp4";

		const now = moment().tz('Asia/Jakarta');
		const date = now.format('MMMM Do YYYY');
		const time = now.format('h:mm:ss A');

		const uptime = process.uptime();
		const uptimeString = `${Math.floor(uptime / (60 * 60 * 24))}d ${Math.floor((uptime / (60 * 60)) % 24)}h ${Math.floor((uptime / 60) % 60)}m ${Math.floor(uptime % 60)}s`;

		message.reply({
			body: `💫《 ⩸__𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨__⩸ 》💫
\🤖 𝐵𝑜𝑡 𝑁𝑎𝑚𝑒 : ⩸__${botInfo.name}__⩸
\👾 𝑃𝑟𝑒𝑓𝑖𝑥 : ${botInfo.prefix}
\💙 𝑂𝑤𝑛𝑒𝑟 : ${ownerInfo.name}
\📝 𝐴𝑔𝑒 : ${ownerInfo.age}
\💕 𝑅𝑒𝑙𝑎𝑡𝑖𝑜𝑛𝑆ℎ𝑖𝑝 : ${ownerInfo.status}
\🌐 𝑊ℎ𝑎𝑡𝑠𝐴𝑝𝑝 : ${ownerInfo.whatsapp}
\🌍 𝐹𝑎𝑐𝑒𝑏𝑜𝑜𝑘 : ${ownerInfo.facebook}
\🗓 𝐷𝑎𝑡𝑒 : ${date}
\⏰ 𝑇𝑖𝑚𝑒 : ${time}
\📛 𝑈𝑝𝑡𝑖𝑚𝑒 : ${uptimeString}

🔗 𝑂𝑡ℎ𝑒𝑟 𝑆𝑜𝑐𝑖𝑎𝑙𝑠:
📌 𝑻𝒈: Nai re vhai🙂  
📌 𝑰𝒏𝒔𝒕𝒂: deskofsohan🙂  
📌 𝑪𝒂𝒑𝑪𝒖𝒕: Impossible 😫  
📌 𝑻𝒊𝒌𝑻𝒐𝒌: Ami Ki Prothi bondi naki🙂?  
📌 𝒀𝒐𝒖𝑻𝒖𝒃𝒆: 🤨  
\===============`,
			attachment: await global.utils.getStreamFromURL(videoLink)
		});
	},

	onChat: async function ({ event, message }) {
		if (event.body && event.body.toLowerCase() === "info") {
			this.onStart({ message });
		}
	}
};
