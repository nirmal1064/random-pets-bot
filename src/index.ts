import express, { Request, Response } from "express";
import bot from "./bot";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello From Random Pets Bot API" });
});

app.post(`/${process.env.BOT_API_TOKEN}`, (req: Request, res: Response) => {
  console.log("Post method");
  bot.processUpdate(req.body);
  res.status(200).json({ message: "Telegram Bot Okay" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
