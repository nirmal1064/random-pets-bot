import * as dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { getImage } from "./api";

dotenv.config();

const BOT_API_TOKEN: string = process.env.BOT_API_TOKEN || "";

let bot: TelegramBot;

if (process.env.NODE_ENV === "production") {
  bot = new TelegramBot(BOT_API_TOKEN);
  bot.setWebHook(process.env.HEROKU_URL + BOT_API_TOKEN);
} else {
  bot = new TelegramBot(BOT_API_TOKEN, { polling: true });
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Hey ${msg.chat.first_name}`);
});

bot.onText(/\/random_dog/, async (msg) => {
  console.log("User requested");
  console.log(msg);
  const resp = await getImage();
  if (resp) {
    bot.sendPhoto(msg.chat.id, resp);
  } else {
    bot.sendMessage(msg.chat.id, `No dogs found`);
  }
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  if (match) {
    const resp = match[1]; // the captured "whatever"
    console.log(match.length);
    bot.sendMessage(chatId, resp);
  } else {
    bot.sendMessage(chatId, `Your Message ${msg.text}`);
  }
});
