"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const grammy_1 = require("grammy");
const bot = new grammy_1.Bot('BOT_API_KEY');
bot.command('start', ctx => ctx.reply('Ласкаво просимо! Бот запущений.'));
bot.on('message', ctx => ctx.reply('Отримав ще одне повідомлення!'));
bot.start();
