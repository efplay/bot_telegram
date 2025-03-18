import 'dotenv/config'
import { Bot } from 'grammy'

const bot = new Bot(process.env.BOT_API_KEY)
bot.command('start', ctx => ctx.reply('Ласкаво просимо! Бот запущений.'))

bot.on('message', ctx => ctx.reply('Отримав ще одне повідомлення!'))

bot.start()
