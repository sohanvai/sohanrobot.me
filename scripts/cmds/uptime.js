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
        shortDescription: {
            en: "Shows system uptime and info."
        },
        longDescription: {
            en: "Displays uptime, memory, CPU, and other system details."
        },
        category: "SYSTEM",
        guide: {
            en: "{pn}"
        }
    },

    onStart: async function ({ message, event, args, api, usersData, threadsData }) {
        const iURL = "https://i.imgur.com/4uggLXJ.jpeg"; // Fixed photo link
        const uptime = process.uptime();
        const s = Math.floor(uptime % 60);
        const m = Math.floor((uptime / 60) % 60);
        const h = Math.floor((uptime / (60 * 60)) % 24);
        const upSt = `${h}H ${m}M ${s}S`;

        let threadInfo = await api.getThreadInfo(event.threadID);
        const males = threadInfo.userInfo.filter(user => user.gender === "MALE").length;
        const females = threadInfo.userInfo.filter(user => user.gender === "FEMALE").length;
        const users = await usersData.getAll();
        const threads = await threadsData.getAll();

        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const system = `${os.platform()} ${os.release()}`;
        const model = `${os.cpus()[0].model}`;
        const cores = os.cpus().length;
        const processMemory = prettyBytes(process.memoryUsage().rss);

        const messageBody = `
🔥 *System Status Report* 🔥

⏳ *Uptime:* ${upSt}
👨 *Males:* ${males}  
👩 *Females:* ${females}  
🌍 *Total Users:* ${users.length}  
🏠 *Total Groups:* ${threads.length}  

💻 *Operating System:* ${system}  
⚙️ *CPU Model:* ${model}  
🔢 *Cores:* ${cores}  

📂 *Memory Usage:* ${prettyBytes(usedMemory)} / ${prettyBytes(totalMemory)}
🔋 *Process Memory:* ${processMemory}  

🚀 *Powered by HAXOR SOHAN & CK KING*  
`;

        message.reply({
            body: messageBody,
            attachment: await global.utils.getStreamFromURL(iURL)
        }, event.threadID);
    }
};

async function getDiskUsage() {
    const { stdout } = await exec('df -k /');
    const [_, total, used] = stdout.split('\n')[1].split(/\s+/).filter(Boolean);
    return { total: parseInt(total) * 1024, used: parseInt(used) * 1024 };
}

function prettyBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
}
