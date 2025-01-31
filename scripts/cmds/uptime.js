/* Bismillahir Rahmanir Rahim */
const os = require("os");
const fs = require("fs-extra");

const startTime = new Date();

module.exports = {
  config: {
    name: "uptime",
    aliases: ["up"],
    author: "ArYAN",
    countDown: 0,
    role: 0,
    category: "system",
    longDescription: {
      en: "Get System Information",
    },
  },

  onStart: async function ({ api, event, threadsData, usersData }) {
    try {
      const uptimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(uptimeInSeconds / 3600);
      const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
      const seconds = uptimeInSeconds % 60;

      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();

      // Replace this URL with your preferred image
      const imageURL = "https://i.imgur.com/7dmr2Hi.jpeg"; 

      const formattedMessage = `
『 𝗕𝗶𝘀𝗺𝗶𝗹𝗹𝗮𝗵𝗶𝗿 𝗥𝗮𝗵𝗺𝗮𝗻𝗶𝗿 𝗥𝗮𝗵𝗶𝗺 』

╭── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╮
         𝗕𝗢𝗧 𝗦𝗧𝗔𝗧𝗨𝗦
╰── ⋅ ⋅ ── ✩ ── ⋅ ⋅ ──╯

🌸 ➺ 𝗣𝗿𝗲𝗳𝗶𝘅: . 
⏳ ➺ 𝗨𝗽𝘁𝗶𝗺𝗲: ${hours}ʜ ${minutes}ᴍ ${seconds}ꜱ
👦 ➺ 𝗕𝗼𝘆𝘀: 𝟯𝟮
👧 ➺ 𝗚𝗶𝗿𝗹𝘀: 𝟴
🌐 ➺ 𝗚𝗿𝗼𝘂𝗽𝘀: ${allThreads.length}
👤 ➺ 𝗨𝘀𝗲𝗿𝘀: ${allUsers.length}
⚡ ➺ 𝗢𝘄𝗻𝗲𝗿: 𝗛𝗮𝘅𝗼𝗿 𝗦𝗼𝗵𝗮𝗻

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
      `.trim();

      await api.sendMessage({
        body: formattedMessage,
        attachment: await global.utils.getStreamFromURL(imageURL)
      }, event.threadID);

    } catch (error) {
      console.error("Error:", error);
      await api.sendMessage("❌ Error retrieving information", event.threadID);
    }
  },
};
