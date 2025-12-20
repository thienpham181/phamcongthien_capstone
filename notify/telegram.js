//Load biến môi trường từ .env
import 'dotenv/config';
import fs from 'fs';
import axios from 'axios';

//Lấy token và chat_id từ .env
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

//Đọc kết quả summary từ Allure
function readAllureSummary() {
  const filePath = './allure-report/widgets/summary.json';
  if (!fs.existsSync(filePath)) {
    throw new Error('❌ Không tìm thấy file summary.json. Hãy chạy test trước!');
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const stats = data.statistic;
  return {
    passed: stats.passed,
    failed: stats.failed,
    broken: stats.broken,
    total: stats.total,
    time: new Date().toLocaleString('vi-VN')
  };
}

//Gửi tin nhắn lên Telegram
async function sendTelegramMessage(message) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });

    if (res.data.ok) {
      console.log('✅ Đã gửi thông báo Telegram thành công!');
    } else {
      console.error('⚠️ Telegram trả lỗi:', res.data);
    }
  } catch (err) {
    console.error('❌ Lỗi gửi Telegram:', err.message);
  }
}

//Main: tạo nội dung và gửi
async function main() {
  try {
    const summary = readAllureSummary();
    const msg = `📊 *BÁO CÁO CI TEST TỰ ĐỘNG*  
🕐 Thời gian: ${summary.time}  
✅ Pass: ${summary.passed}  
❌ Fail: ${summary.failed}  
⚠️ Broken: ${summary.broken}  
📈 Tổng: ${summary.total}
📦 Repository: *${process.env.GITHUB_REPOSITORY}*
🔁 Branch: *${process.env.GITHUB_REF_NAME}*`;

    await sendTelegramMessage(msg);
  } catch (err) {
    console.error('❌ Lỗi đọc report hoặc gửi Telegram:', err.message);
  }
}

main();