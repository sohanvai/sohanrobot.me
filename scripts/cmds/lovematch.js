const axios = require("axios");
const fs = require("fs-extra");
const { loadImage, createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "lovematch",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Find your funny love match!",
    },
    longDescription: {
      en: "Want to know your funny love fate? Try this!",
    },
    category: "fun",
    guide: {
      en: "{pn}",
    },
  },

  onStart: async function ({ api, event, usersData }) {
    let pathImg = __dirname + "/assets/love_bg.png";
    let pathAvt1 = __dirname + "/assets/user1.png";
    let pathAvt2 = __dirname + "/assets/user2.png";

    var userID = event.senderID;
    var userName = await usersData.getName(userID);

    var threadInfo = await api.getThreadInfo(event.threadID);
    var allUsers = threadInfo.userInfo;
    var botID = api.getCurrentUserID();
    var potentialMatches = [];

    // Finding user's gender
    var userGender = allUsers.find(u => u.id === userID)?.gender;

    if (userGender === "FEMALE") {
      potentialMatches = allUsers.filter(u => u.gender === "MALE" && u.id !== userID && u.id !== botID);
    } else if (userGender === "MALE") {
      potentialMatches = allUsers.filter(u => u.gender === "FEMALE" && u.id !== userID && u.id !== botID);
    } else {
      potentialMatches = allUsers.filter(u => u.id !== userID && u.id !== botID);
    }

    if (potentialMatches.length === 0) {
      return api.sendMessage("No potential matches found in this chat! 💔", event.threadID);
    }

    var match = potentialMatches[Math.floor(Math.random() * potentialMatches.length)];
    var matchID = match.id;
    var matchName = await usersData.getName(matchID);

    var lovePercentage = Math.floor(Math.random() * 101);
    var specialPercentages = ["💔 0%", "🔥 99%", "💀 -100%", "🚀 101%", "😂 5%"];
    var finalPercentage = Math.random() > 0.7 ? specialPercentages[Math.floor(Math.random() * specialPercentages.length)] : `${lovePercentage}%`;

    let reactions = [
      "😱 Omg! Unexpected Love Alert!",
      "🤣 Haha! You guys look perfect!",
      "💘 True Love Detected!",
      "💀 This might be a disaster!",
      "🔥🔥 Hot Couple!",
      "😂 What a surprise match!"
    ];
    var reaction = reactions[Math.floor(Math.random() * reactions.length)];

    let backgroundURL = "https://i.ibb.co/RBRLmRt/Pics-Art-05-14-10-47-00.jpg";

    // Downloading images
    let userAvatar = (
      await axios.get(`https://graph.facebook.com/${userID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: "arraybuffer" })
    ).data;
    fs.writeFileSync(pathAvt1, Buffer.from(userAvatar, "utf-8"));

    let matchAvatar = (
      await axios.get(`https://graph.facebook.com/${matchID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: "arraybuffer" })
    ).data;
    fs.writeFileSync(pathAvt2, Buffer.from(matchAvatar, "utf-8"));

    let backgroundImg = (
      await axios.get(backgroundURL, { responseType: "arraybuffer" })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(backgroundImg, "utf-8"));

    // Creating image
    let baseImage = await loadImage(pathImg);
    let baseAvt1 = await loadImage(pathAvt1);
    let baseAvt2 = await loadImage(pathAvt2);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");

    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseAvt1, 120, 180, 320, 320);
    ctx.drawImage(baseAvt2, 1050, 180, 320, 320);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt1);
    fs.removeSync(pathAvt2);

    return api.sendMessage({
      body: `💘 *Love Detector Activated* 💘\n\n✨ ${userName} & ${matchName} ✨\n🔮 Love Percentage: *${finalPercentage}*\n\n🎭 *Reaction:* ${reaction}`,
      mentions: [
        { tag: userName, id: userID },
        { tag: matchName, id: matchID },
      ],
      attachment: fs.createReadStream(pathImg),
    },
      event.threadID,
      () => fs.unlinkSync(pathImg),
      event.messageID
    );
  },
};
