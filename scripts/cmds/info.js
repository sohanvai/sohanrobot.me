const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "NTKhang",
    category: "owner",
  },
  
  onStart: async function({ message }) {
    const authorName = "HAXOR SOHAN";
    const ownAge = "16+";
    const messenger = "nai Jah Vhag🙂";
    const authorFB = "Desk Of Sohan";
    const authorNumber = "01888240943";
    const Status = "Single";
    const urls = ["https://i.imgur.com/e74rsW1.mp4"];
    const link = urls[Math.floor(Math.random() * urls.length)];
    
    const now = moment().tz('Asia/Jakarta');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');
    const uptime = process.uptime();
    
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

    message.reply({
      body: `💫《 Bot & Owner Information 》💫
Bot Name: ${global.GoatBot.config.nickNameBot}
Owner: ${authorName}
Age: ${ownAge}
Relationship Status: ${Status}
Contact: ${authorNumber}
Facebook: ${authorFB}
Date: ${date}
Time: ${time}
Bot Uptime: ${uptimeString}
Any Help Contact: ${messenger}`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  },
  
  onChat: async function({ event, message }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
};