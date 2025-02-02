const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "pair",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Discover your soulmate 💞",
    },
    longDescription: {
      en: "Let destiny reveal the one who completes your heart! ❤️",
    },
    category: "LOVE",
    guide: {
      en: "{pn}",
    },
  },

  onStart: async function ({ api, args, message, event, threadsData, usersData }) {
    const { loadImage, createCanvas } = require("canvas");
    let backgroundPath = __dirname + "/assets/background.png";
    let avatarPath1 = __dirname + "/assets/avatar1.png";
    let avatarPath2 = __dirname + "/assets/avatar2.png";

    let senderID = event.senderID;
    let senderName = await usersData.getName(senderID);
    let threadInfo = await api.getThreadInfo(event.threadID);
    let participants = threadInfo.userInfo;

    let senderGender;
    for (let user of participants) {
      if (user.id == senderID) senderGender = user.gender;
    }

    const botID = api.getCurrentUserID();
    let potentialMatches = [];

    if (senderGender === "FEMALE") {
      potentialMatches = participants.filter(user => user.gender === "MALE" && user.id !== senderID && user.id !== botID).map(user => user.id);
    } else if (senderGender === "MALE") {
      potentialMatches = participants.filter(user => user.gender === "FEMALE" && user.id !== senderID && user.id !== botID).map(user => user.id);
    } else {
      potentialMatches = participants.filter(user => user.id !== senderID && user.id !== botID).map(user => user.id);
    }

    let matchID = potentialMatches[Math.floor(Math.random() * potentialMatches.length)];
    let matchName = await usersData.getName(matchID);
    let lovePercentage = Math.floor(Math.random() * 100) + 1;

    let romanticBackgrounds = [
      "https://i.ibb.co/RBRLmRt/Pics-Art-05-14-10-47-00.jpg",
    ];

    let senderAvatar = (await axios.get(`https://graph.facebook.com/${senderID}/picture?width=720&height=720&access_token=YOUR_ACCESS_TOKEN`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(avatarPath1, Buffer.from(senderAvatar, "utf-8"));

    let matchAvatar = (await axios.get(`https://graph.facebook.com/${matchID}/picture?width=720&height=720&access_token=YOUR_ACCESS_TOKEN`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(avatarPath2, Buffer.from(matchAvatar, "utf-8"));

    let backgroundImage = (await axios.get(romanticBackgrounds[0], { responseType: "arraybuffer" })).data;
    fs.writeFileSync(backgroundPath, Buffer.from(backgroundImage, "utf-8"));

    let canvas = createCanvas(1280, 720);
    let ctx = canvas.getContext("2d");

    let baseImage = await loadImage(backgroundPath);
    let senderAvatarImg = await loadImage(avatarPath1);
    let matchAvatarImg = await loadImage(avatarPath2);

    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(senderAvatarImg, 111, 175, 330, 330);
    ctx.drawImage(matchAvatarImg, 1018, 173, 330, 330);

    let finalImage = canvas.toBuffer();
    fs.writeFileSync(backgroundPath, finalImage);

    fs.removeSync(avatarPath1);
    fs.removeSync(avatarPath2);

    return api.sendMessage({
      body: `💖✨ Congratulations, ${senderName}! ✨💖\n❤️ It seems fate has paired you with ${matchName}! ❤️\n🔗 Your love compatibility is ${lovePercentage}% 🔗\n🌟 A match made by destiny! 💫`,
      mentions: [{ tag: senderName, id: senderID }, { tag: matchName, id: matchID }],
      attachment: fs.createReadStream(backgroundPath),
    }, event.threadID, () => fs.unlinkSync(backgroundPath), event.messageID);
  }
};
