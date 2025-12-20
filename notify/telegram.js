import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;


if (!BOT_TOKEN || !CHAT_ID) {
  console.error("❌ Missing Telegram env variables");
  process.exit(1);
}

const message = `
🚀 *Playwright CI Github Completed*

📦 Repository: *${process.env.GITHUB_REPOSITORY}*
🔁 Branch: *${process.env.GITHUB_REF_NAME}*
👤 Triggered by: *${process.env.GITHUB_ACTOR}*
⏱️ Thời gian: ${new Date().toLocaleString("vi-VN")}
`;

async function sendTelegram() {
  await axios.post(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
      disable_web_page_preview: false
    }
  );

  console.log("✅ Telegram notification sent");
}

sendTelegram();
