"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bot_1 = __importDefault(require("./bot"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello From Random Pets Bot API" });
});
app.post(`/${process.env.BOT_API_TOKEN}`, (req, res) => {
    console.log("Post method");
    bot_1.default.processUpdate(req.body);
    res.status(200).json({ message: "Telegram Bot Okay" });
});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
