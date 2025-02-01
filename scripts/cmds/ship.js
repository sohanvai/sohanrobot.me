const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "ship",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Find your chaotic soulmate (results may vary)"
    },
    longDescription: {
      en: "Discover who you'll annoy for eternity 🔥"
    },
    category: "love",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event, usersData }) {
    const { loadImage, createCanvas } = require("canvas");
    const pathImg = __dirname + "/assets/background.png";
    const pathAvt1 = __dirname + "/assets/any.png";
    const pathAvt2 = __dirname + "/assets/avatar.png";

    // Get user info
    const id1 = event.senderID;
    const name1 = await usersData.getName(id1);
    const ThreadInfo = await api.getThreadInfo(event.threadID);
    const allUsers = ThreadInfo.userInfo;

    // Find user's gender
    const userGender = allUsers.find(u => u.id === id1)?.gender || "MYSTERY";

    // Generate candidate pool
    const botID = api.getCurrentUserID();
    let candidates = [];
    
    if (userGender === "FEMALE") {
      candidates = allUsers.filter(u => 
        u.gender === "MALE" && u.id !== id1 && u.id !== botID
      );
    } else if (userGender === "MALE") {
      candidates = allUsers.filter(u => 
        u.gender === "FEMALE" && u.id !== id1 && u.id !== botID
      );
    } else {
      candidates = allUsers.filter(u => 
        u.id !== id1 && u.id !== botID
      );
    }

    // Select victim... err, soulmate
    const id2 = candidates[Math.floor(Math.random() * candidates.length)]?.id;
    if (!id2) return api.sendMessage("🚨 No available victims... I mean candidates!", event.threadID);

    const name2 = await usersData.getName(id2);

    // Generate hilarious compatibility score
    const funnyScores = ["-9000", "NaN", "69", "420", "101", "0.01", "🐢", "💩"];
    const compatibility = funnyScores[Math.floor(Math.random() * funnyScores.length)];

    // Generate roast... I mean, compatibility comment
    let roast = "";
    if (compatibility === "69") roast = "Nice. 😏";
    else if (compatibility === "420") roast = "Blaze it! 🌿🔥";
    else if (compatibility === "-9000") roast = "IT'S OVER 9000... but in reverse 💀";
    else if (compatibility === "💩") roast = "Poop happens 💩 Better luck next life!";
    else if (compatibility === "🐢") roast = "Slow and steady wins... nothing?";
    else roast = "Results may contain traces of nonsense 🎲";

    // Download profile pictures
    const [avt1, avt2] = await Promise.all([
      axios.get(`https://graph.facebook.com/${id1}/picture?width=720&height=720`, { responseType: "arraybuffer" }),
      axios.get(`https://graph.facebook.com/${id2}/picture?width=720&height=720`, { responseType: "arraybuffer" })
    ]);

    fs.writeFileSync(pathAvt1, Buffer.from(avt1.data));
    fs.writeFileSync(pathAvt2, Buffer.from(avt2.data));

    // Create image
    const baseImage = await loadImage("https://i.ibb.co/RBRLmRt/Pics-Art-05-14-10-47-00.jpg");
    const baseAvt1 = await loadImage(pathAvt1);
    const baseAvt2 = await loadImage(pathAvt2);

    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0);
    ctx.drawImage(baseAvt1, 111, 175, 330, 330);  // Left image
    ctx.drawImage(baseAvt2, 1018, 173, 330, 330); // Right image

    fs.writeFileSync(pathImg, canvas.toBuffer());
    fs.unlinkSync(pathAvt1);
    fs.unlinkSync(pathAvt2);

    // Send hilarious message
    api.sendMessage({
      body: `💘 **LOVE CALCULATOR 3000** 💘\n\n` +
            `✨ ${name1} ➕ ${name2} ✨\n` +
            `🔥 Compatibility: ${compatibility}% ${compatibility === "69" ? "( ͡° ͜ʖ ͡°)" : ""}\n\n` +
            `${roast}\n\n` +
            "⚠️ Warning: This prediction is 0.0001% accurate\n" +
            "💔 If you crash and burn, don't @ me",
      mentions: [
        { tag: name1, id: id1 },
        { tag: name2, id: id2 }
      ],
      attachment: fs.createReadStream(pathImg)
    }, event.threadID, () => fs.unlinkSync(pathImg));
  }
};
