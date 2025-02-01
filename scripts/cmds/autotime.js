const moment = require('moment-timezone');

module.exports.config = {
  name: "autotime",
  version: "2.0.0",
  role: 0,
  author: "MOHAMMAD-BADOL", 
  description: "autotime",
  category: "AutoTime",
  countDown: 3
};

module.exports.onLoad = async ({ api }) => {
  const arrayData = {
    "12:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-মধ্যরাত⏰ 12:00 AM\n\n📌 রাতের পাহারায় কে কে আছো?" },
    "01:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-রাত⏰ 01:00 AM\n\n📌 সবাই এখন গিটার বাজানো বন্ধ কর 🤐" },
    "02:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-রাত⏰ 02:00 AM\n\n📌 অনেক তো গিটার বাজাইছো এবার একটু ঘুমাও 😒" },
    "03:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-রাত⏰ 03:00 AM\n\n📌 কে কে এখনো ঘুমাও নাই আমার মত 🥺" },
    "04:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-রাত⏰ 04:00 AM\n\n📌 একটু পরে ফজরের আজান হবে নামাজ পড়ে নিও সবাই 😊" },
    "05:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-ভোর⏰ 05:00 AM\n\n📌 ভোর হয়ে গেল এখনো ঘুম থেকে ওঠো নাই?" },
    "06:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-সকাল⏰ 06:00 AM\n\n📌 শুভ সকাল সবাইকে ☺" },
    "07:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-সকাল⏰ 07:00 AM\n\n📌 যে যার কাজে বেরিয়ে পড়ো 😢" },
    "08:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-সকাল⏰ 08:00 AM\n\n📌 এখনো অনেক জমিদারের বাচ্চারা ঘুমিয়ে আছে 🙄" },
    "09:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-সকাল⏰ 09:00 AM\n\n📌 তোমাদেরকে ডাকতে ডাকতে নয়টা বেজে গেল এবার তো ঘুম থেকে ওঠো 😐" },
    "10:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-সকাল⏰ 10:00 AM\n\n📌 কাজের মধ্যে আছো তো?" },
    "11:00:00 AM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-বেলা⏰ 11:00 AM\n\n📌 দুপুরের খাবারের প্রস্তুতি নিচ্ছো?" },
    "12:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-দুপুর⏰ 12:00 PM\n\n📌 স্কুল ছুটি দিছে চলো সবাই মাল দেখে আসি 😘" },
    "01:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-দুপুর⏰ 01:00 PM\n\n📌 ভাতঘুমের সময় হলো! 😴" },
    "02:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-বিকাল⏰ 02:00 PM\n\n📌 বিকালের ঘুম বেশি হয়ে যাচ্ছে না?" },
    "03:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-বিকাল⏰ 03:00 PM\n\n📌 একটু রিল্যাক্স করো, অনেক কাজ করেছো" },
    "04:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-বিকাল⏰ 04:00 PM\n\n📌 খেলার সময় হয়ে গেল!" },
    "05:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-সন্ধ্যা⏰ 05:00 PM\n\n📌 সবাই মাগরিবের নামাজ পড়ে নিও" },
    "06:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-সন্ধ্যা⏰ 06:00 PM\n\n📌 সন্ধ্যা হয়ে গেল, বাইরে থাকলে বাসায় ফিরে যাও!" },
    "07:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-রাত⏰ 07:00 PM\n\n📌 রাতের খাবারের প্রস্তুতি নিয়ে নাও" },
    "08:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-রাত⏰ 08:00 PM\n\n📌 কাজের মাঝে একটু বিরতি নাও" },
    "09:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-রাত⏰ 09:00 PM\n\n📌 পড়াশোনা করবা নাকি ঘুমাতে যাবে?" },
    "10:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-রাত⏰ 10:00 PM\n\n📌 ঘুমানোর সময় হয়ে গেছে" },
    "11:00:00 PM": { message: "❁ HAXOR SOHAN 𖠌:\n▬▬▬▬▬▬▬▬▬▬▬▬\n🔔-এখন-সময়-রাত⏰ 11:00 PM\n\n📌 রাত জাগা ঠিক না!" }
  };

  const checkTimeAndSendMessage = () => {
    const now = moment().tz('Asia/Dhaka');
    const currentTime = now.format('hh:mm:ss A');
    const messageData = arrayData[currentTime];

    if (messageData) {
      const tid = global.db.allThreadData.map(i => i.threadID);
      tid.forEach(async (threadID) => {
        api.sendMessage({ body: messageData.message }, threadID);
      });
    }

    setTimeout(checkTimeAndSendMessage, 60000);
  };

  checkTimeAndSendMessage();
};

module.exports.onStart = () => {};
