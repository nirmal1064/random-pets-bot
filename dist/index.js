"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const api_1 = require("./api");
dotenv.config();
const BOT_API_TOKEN = process.env.BOT_API_TOKEN || "";
let bot;
if (process.env.NODE_ENV === "production") {
    bot = new node_telegram_bot_api_1.default(BOT_API_TOKEN);
    bot.setWebHook(process.env.HEROKU_URL + BOT_API_TOKEN);
}
else {
    bot = new node_telegram_bot_api_1.default(BOT_API_TOKEN, { polling: true });
}
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Hey ${msg.chat.first_name}`);
});
bot.onText(/\/random_dog/, async (msg) => {
    console.log("User requested");
    console.log(msg);
    const resp = await (0, api_1.getImage)();
    if (resp) {
        bot.sendPhoto(msg.chat.id, resp);
    }
    else {
        bot.sendMessage(msg.chat.id, `No dogs found`);
    }
});
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (match) {
        const resp = match[1]; // the captured "whatever"
        console.log(match.length);
        bot.sendMessage(chatId, resp);
    }
    else {
        bot.sendMessage(chatId, `You sent ${msg.text}`);
    }
});
