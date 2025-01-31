const schedule = require("node-schedule");

module.exports = {
  config: {
    name: "autoprayer",
    aliases: ["namazreminder", "prayerreminder"],
    version: "1.2",
    author: "Sohan",
    countDown: 0,
    role: 0,
    shortDescription: "Automatic prayer reminders",
    longDescription: "Send reminders for 5 daily prayers at their respective times.",
    category: "Utility",
    guide: "{pn} start | stop"
  },

  jobs: [], // Active jobs tracker

  onStart: async function ({ api, args, message, event }) {
    const threadID = event.threadID;

    if (args[0] === "start") {
      message.reply("✅ Automatic prayer reminders are now active!");

      // বাংলাদেশ সময় অনুযায়ী পাঁচ ওয়াক্ত নামাজের সময়
      const prayerTimes = [
        { time: "5:15", message: "🌄 ফজর নামাজের সময় হয়েছে! দয়া করে নামাজ পড়ে নাও।" },
        { time: "12:30", message: "☀️ জোহর নামাজের সময় হয়েছে! নামাজ পড়ার জন্য প্রস্তুত হও।" },
        { time: "15:45", message: "🌅 আসর নামাজের সময় হয়েছে! আল্লাহর দিকে মন দাও।" },
        { time: "17:45", message: "🌆 মাগরিব নামাজের সময় হয়েছে! আল্লাহকে স্মরণ করো।" },
        { time: "19:30", message: "🌙 ইশা নামাজের সময় হয়েছে! ঘুমানোর আগে নামাজ পড়ে নাও।" }
      ];

      // Schedule each prayer reminder
      prayerTimes.forEach(prayer => {
        const [hour, minute] = prayer.time.split(":");
        const job = schedule.scheduleJob({ hour, minute, tz: "Asia/Dhaka" }, function () {
          api.sendMessage(prayer.message, threadID);
        });

        module.exports.jobs.push(job);
      });

    } else if (args[0] === "stop") {
      module.exports.jobs.forEach(job => job.cancel());
      module.exports.jobs = [];
      message.reply("❌ Prayer reminders have been stopped.");
    } else {
      message.reply("Usage: !autoprayer start | stop");
    }
  }
};
