module.exports = {
  config: {
    name: "marriage",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Predict your wedding date!",
    },
    longDescription: {
      en: "Want to know when you'll get married? Let the bot predict your future!",
    },
    category: "fun",
    guide: {
      en: "{pn}",
    },
  },

  onStart: async function ({ api, event, usersData }) {
    var userID = event.senderID;
    var userName = await usersData.getName(userID);

    // Random year & month generator
    var year = Math.floor(Math.random() * (2050 - 2025) + 2025);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[Math.floor(Math.random() * months.length)];
    var day = Math.floor(Math.random() * 28) + 1; // To avoid 30/31 issue

    var marriageDate = `${day} ${month}, ${year}`;

    // Funny Reasons
    var reasons = [
      "💍 Because you finally found someone who can tolerate you!",
      "😂 Your parents got tired of waiting!",
      "🔥 Destiny decided it's your time!",
      "😳 You accidentally signed a marriage contract!",
      "💘 Cupid shot his arrow... finally!",
      "🤣 You lost a bet and now you must marry!",
      "🕵️ FBI approved your love story!",
      "🌍 The world needed a power couple like you!"
    ];
    var reason = reasons[Math.floor(Math.random() * reasons.length)];

    return api.sendMessage(
      `🎉 *Marriage Prediction for ${userName}* 🎉\n\n💞 Wedding Date: *${marriageDate}*\n📜 *Reason:* ${reason}`,
      event.threadID,
      event.messageID
    );
  },
};
