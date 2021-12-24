process.env.NTBA_FIX_319 = "10";
import TelegramBot, { Message, SendPhotoOptions } from "node-telegram-bot-api";
import { getDog, getDogFact, getDogImage, getPanda } from "./api/animals";
import { getCat, getElephant } from "./unsplash";

const BOT_API_TOKEN: string = process.env.BOT_API_TOKEN || "";

let bot: TelegramBot;

if (process.env.NODE_ENV === "production") {
  console.log("Running in Production mode");
  bot = new TelegramBot(BOT_API_TOKEN);
  bot.setWebHook(process.env.HEROKU_URL + BOT_API_TOKEN);
} else {
  bot = new TelegramBot(BOT_API_TOKEN, { polling: true });
}

bot.onText(/\/start/, (msg: Message) => {
  bot.sendMessage(msg.chat.id, `Hey ${msg.chat.first_name}`);
});

bot.onText(/^\/random_dog_image$/, async (msg: Message) => {
  const resp = await getDogImage();
  if (resp) {
    bot.sendPhoto(msg.chat.id, resp);
  } else {
    bot.sendMessage(msg.chat.id, `No dogs found`);
  }
});

bot.onText(/^\/random_dog_fact$/, async (msg: Message) => {
  const resp = await getDogFact();
  if (resp) {
    bot.sendMessage(msg.chat.id, resp);
  } else {
    bot.sendMessage(msg.chat.id, `No dogs found`);
  }
});

bot.onText(/^\/dog$/, async (msg: Message) => {
  const resp = await getDog();
  if (resp) {
    const photoOptions: SendPhotoOptions = { caption: `Fact: ${resp.fact}` };
    bot.sendPhoto(msg.chat.id, resp.image, photoOptions);
  } else {
    bot.sendMessage(msg.chat.id, `No dogs found`);
  }
});

bot.onText(/^\/panda$/, async (msg: Message) => {
  const resp = await getPanda();
  if (resp) {
    const photoOptions: SendPhotoOptions = { caption: `Fact: ${resp.fact}` };
    bot.sendPhoto(msg.chat.id, resp.image, photoOptions);
  } else {
    bot.sendMessage(msg.chat.id, `No panda found`);
  }
});

bot.onText(/^\/cat$/, async (msg: Message) => {
  const resp = await getCat();
  if (resp) {
    bot.sendPhoto(msg.chat.id, resp);
  } else {
    bot.sendMessage(msg.chat.id, `No Cats found`);
  }
});

bot.onText(/^\/elephant$/, async (msg: Message) => {
  const resp = await getElephant();
  if (resp) {
    bot.sendPhoto(msg.chat.id, resp);
  } else {
    bot.sendMessage(msg.chat.id, `No Baby Elephants found`);
  }
});

export default bot;
