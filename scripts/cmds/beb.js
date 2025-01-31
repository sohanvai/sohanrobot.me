const axios = require("axios");

module.exports = {
  config: {
    name: 'beb',
    aliases: ["bbz", "bbs"],
    version: '1.2',
    author: 'Redwan | VEX ADNAN',
    countDown: 0,
    role: 0,
    shortDescription: 'AI CHAT',
    longDescription: {
      vi: 'Chat với AI',
      en: 'Chat with AI'
    },
    category: 'AI Chat',
    guide: {
      vi: '{pn} [on | off]: bật/tắt AI chat\n{pn} <word>: chat nhanh với AI\nVí dụ: {pn} hi',
      en: '{pn} [on | off]: turn on/off AI chat\n{pn} <word>: chat with AI\nExample: {pn} hi'
    }
  },

  langs: {
    vi: {
      turnedOn: 'Bật AI chat thành công!',
      turnedOff: 'Tắt AI chat thành công!',
      chatting: 'Đang chat với AI...'
    },
    en: {
      turnedOn: 'AI chat turned on!',
      turnedOff: 'AI chat turned off!',
      chatting: 'Chatting...'
    }
  },

  onStart: async function ({ api, args, message, event, threadsData, getLang }) {
    if (args[0] === 'on' || args[0] === 'off') {
      await threadsData.set(event.threadID, args[0] === "on", "settings.simsimi");
      return message.reply(args[0] === "on" ? getLang("turnedOn") : getLang("turnedOff"));
    } else if (args[0]) {
      const yourMessage = args.join(" ");
      try {
        const responseMessage = await getMessage(yourMessage);
        return message.reply(responseMessage);
      } catch (err) {
        console.log(err);
      }
    }
  },

  onReply: async function ({ message, event, Reply, args }) {
    if (event.senderID !== Reply.author) return;
    const yourMessage = args.join(" ");
    try {
      const responseMessage = await getMessage(yourMessage);
      return message.reply(responseMessage);
    } catch (err) {
      console.log(err);
    }
  },

  onChat: async function ({ args, message, threadsData, event, isUserCallCommand }) {
    const isChatEnabled = await threadsData.get(event.threadID, "settings.simsimi");

    if (!isChatEnabled || isUserCallCommand) return;

    try {
      const responseMessage = await getMessage(args.join(" "));
      return message.reply(responseMessage);
    } catch (err) {
      console.log(err);
    }
  }
};

async function getMessage(yourMessage) {
  try {
    const res = await axios.get(`https://vex-adnan-404-simsimi-apis.onrender.com/sim?ask=${encodeURIComponent(yourMessage)}`);
    return res.data.respond || "";
  } catch (error) {
    console.log(error);
    return "";
  }
}
