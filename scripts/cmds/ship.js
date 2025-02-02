const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "ship",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Ship two random users"
    },
    longDescription: {
      en: "Discover potential love connections between group members"
    },
    category: "fun",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event, usersData, threadsData }) {
    const { loadImage, createCanvas } = require("canvas");
    const pathImg = __dirname + "/assets/shipbg.png";
    const pathAvt1 = __dirname + "/assets/avt1.png";
    const pathAvt2 = __dirname + "/assets/avt2.png";

    // Get thread information
    const ThreadInfo = await api.getThreadInfo(event.threadID);
    const allUsers = ThreadInfo.userInfo.filter(u => 
      u.id !== api.getCurrentUserID() && u.id !== event.senderID
    );

    if (allUsers.length < 2) {
      return api.sendMessage("⚠️ Not enough users to ship!", event.threadID);
    }

    // Randomly select two different users
    const [user1, user2] = allUsers.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    const name1 = await usersData.getName(user1.id);
    const name2 = await usersData.getName(user2.id);

    // Generate random compatibility
    const percentages = Array(8).fill(Math.floor(Math.random() * 100) + 1)
      .concat(["101", "-1", "∞", "99.9", "0.01"]);
    const compatibility = percentages[Math.floor(Math.random() * percentages.length)];

    // Download and process images
    const [avt1, avt2, bg] = await Promise.all([
      axios.get(`https://graph.facebook.com/${user1.id}/picture?width=720&height=720`, { responseType: "arraybuffer" }),
      axios.get(`https://graph.facebook.com/${user2.id}/picture?width=720&height=720`, { responseType: "arraybuffer" }),
      axios.get("https://i.ibb.co/4N3Y4ZT/shipbg.jpg", { responseType: "arraybuffer" })
    ]);

    fs.writeFileSync(pathAvt1, Buffer.from(avt1.data));
    fs.writeFileSync(pathAvt2, Buffer.from(avt2.data));
    fs.writeFileSync(pathImg, Buffer.from(bg.data));

    // Create canvas composition
    const baseImage = await loadImage(pathImg);
    const baseAvt1 = await loadImage(pathAvt1);
    const baseAvt2 = await loadImage(pathAvt2);
    
    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext("2d");
    
    ctx.drawImage(baseImage, 0, 0);
    ctx.drawImage(baseAvt1, 150, 200, 300, 300);
    ctx.drawImage(baseAvt2, 800, 200, 300, 300);
    
    // Add compatibility text
    ctx.font = "bold 60px Arial";
    ctx.fillStyle = "#ff1493";
    ctx.textAlign = "center";
    ctx.fillText(`${compatibility}%`, 750, 650);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);

    // Cleanup temp files
    fs.removeSync(pathAvt1);
    fs.removeSync(pathAvt2);

    // Send message
    return api.sendMessage({
      body: `🚢 Shipping Alert! 🚢\n\n${name1} + ${name2} = 💞\nCompatibility: ${compatibility}%`,
      mentions: [
        { tag: name1, id: user1.id },
        { tag: name2, id: user2.id }
      ],
      attachment: fs.createReadStream(pathImg)
    }, event.threadID, () => fs.unlinkSync(pathImg));
  }
};
