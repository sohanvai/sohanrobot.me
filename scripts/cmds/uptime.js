const os = require('os');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
    config: {
        name: "uptime",
        aliases: ["up", "system"],
        version: "1.2",
        author: "VEX_ADNAN",
        countDown: 5,
        role: 0,
        shortDescription: { en: "System uptime and stats" },
        longDescription: { en: "Displays uptime, memory, CPU, and system details." },
        category: "SYSTEM",
        guide: { en: "{pn}" }
    },

    onStart: async function ({ message, event, api, usersData, threadsData }) {
        const iURL = "https://i.imgur.com/0yoUfGB.jpeg"; 
        const uptime = process.uptime();
        const s = Math.floor(uptime % 60);
        const m = Math.floor((uptime / 60) % 60);
        const h = Math.floor((uptime / (60 * 60)) % 24);
        const upSt = `${h}𝗛 ${m}𝗠 ${s}𝗦`;

        let threadInfo = await api.getThreadInfo(event.threadID);
        const males = threadInfo.userInfo.filter(user => user.gender === "MALE").length;
        const females = threadInfo.userInfo.filter(user => user.gender === "FEMALE").length;
        const users = await usersData.getAll();
        const threads = await threadsData.getAll();
        const totalMemory = prettyBytes(os.totalmem());
        const usedMemory = prettyBytes(os.totalmem() - os.freemem());
        const system = `${os.platform()} ${os.release()}`;
        const model = os.cpus()[0].model;
        const cores = os.cpus().length;

        const status = `
╭───────────∘°❉°∘───────────╮
      ✦ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗦𝗧𝗔𝗧𝗨𝗦 ✦
╰───────────∘°❉°∘───────────╯
✦ ⏳ 𝗨𝗽𝘁𝗶𝗺𝗲: ${upSt}
✦ 👨 𝗕𝗼𝘆𝘀: ${males} | 👩 𝗚𝗶𝗿𝗹𝘀: ${females}
✦ 🌍 𝗨𝘀𝗲𝗿𝘀: ${users.length} | 🏠 𝗚𝗿𝗼𝘂𝗽𝘀: ${threads.length}
✦ 💻 𝗢𝗦: ${system}
✦ ⚙️ 𝗖𝗣𝗨: ${model} (${cores} 𝗖𝗼𝗿𝗲𝘀)
✦ 📂 𝗠𝗲𝗺𝗼𝗿𝘆: ${usedMemory} / ${totalMemory}
╭───────────∘°❉°∘───────────╮
    ⚡ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆:
  🛠 𝗛𝗮𝘅𝗼𝗿 𝗦𝗼𝗵𝗮𝗻 & 𝗖𝗸 𝗞𝗶𝗻𝗴
╰───────────∘°❉°∘───────────╯
`;

        message.reply({
            body: status,
            attachment: await global.utils.getStreamFromURL(iURL)
        }, event.threadID);
    }
};

function prettyBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
}
