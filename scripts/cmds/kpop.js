module.exports = {
  config: {
    name: "kpop",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "তোমার কে-পপ ভবিষ্যৎ জানো!",
    },
    longDescription: {
      en: "তুমি কোন K-Pop গ্রুপে যোগ দেবে? আসো, বট তোমার ভাগ্য বলে দেবে!",
    },
    category: "fun",
    guide: {
      en: "{pn}",
    },
  },

  onStart: async function ({ api, event, usersData }) {
    var userID = event.senderID;
    var userName = await usersData.getName(userID);

    // Random K-Pop Groups & Idols
    var kpopFutures = [
      "💜 BTS-এর লুকানো ৮ম মেম্বার!",
      "💖 BLACKPINK-এর নতুন র‍্যাপার!",
      "🔥 EXO-এর ‘কমব্যাক স্পেশালিস্ট’!",
      "🌟 Stray Kids-এর হারিয়ে যাওয়া মেম্বার!",
      "🕺 TWICE-এর ব্যাকআপ ড্যান্সার!",
      "🎤 NCT-এর ২৪তম মেম্বার (ডেবিউ এখনো হয়নি)",
      "🎶 ATEEZ-এর নতুন হাই-নোট কিং/কুইন!",
      "😎 TXT-এর ফ্যাশন আইকন!",
      "🥳 SEVENTEEN-এর ১৮তম মেম্বার (উফফ, অনেক হয়ে গেলো!)",
      "🎸 IU-এর গিটার টিউনার!"
    ];
    var kpopDestiny = kpopFutures[Math.floor(Math.random() * kpopFutures.length)];

    // Funny Reasons
    var reasons = [
      "😂 কারণ তুমি হুট করে বাথরুমে নাচতে গিয়ে এক্সিডেন্টালি অডিশন দিয়ে ফেলেছো!",
      "🤣 তুমি BigHit-কে ঘুষ দিয়ে ঢুকেছো!",
      "💃 কারণ তোমার ‘TikTok’ ড্যান্স ভিডিও ভাইরাল হয়ে গেছে!",
      "🔥 তুমি একবার স্টেজে চিৎকার করেছিলে, আর কোরিয়া সেটাই শুনে তোমাকে নিয়ে নিলো!",
      "😎 YG Entertainment-এ ঢুকতে গিয়ে তুমি ভুল করে CEO-এর চেয়ারে বসে গেছো!",
      "💰 তুমি বলেছো কোম্পানিকে প্রতিদিন ফ্রি রামেন খাওয়াবে, তাই তারা তোমাকে নিয়ে নিয়েছে!",
      "🎤 কারণ তুমি ‘Oppa!’ এত জোরে চিৎকার করেছো যে, তারা ভেবেছে তুমি ট্রেইনি!",
      "🤣 তুমি স্টেজে হোঁচট খেয়ে পড়লেও দেখতে স্টাইলিশ লেগেছে, তাই তোমাকে গ্রুপে ঢোকানো হলো!",
      "💜 BTS বলেছে, ‘Jin-এর জায়গায় তুমি ট্রাই করে দেখতে পারো!’"
    ];
    var reason = reasons[Math.floor(Math.random() * reasons.length)];

    return api.sendMessage(
      `🎶 *${userName}-এর K-Pop ভবিষ্যৎ!* 🎶\n\n🌟 তোমার K-Pop ভাগ্য: *${kpopDestiny}*\n📜 *কারণ:* ${reason}`,
      event.threadID,
      event.messageID
    );
  },
};
