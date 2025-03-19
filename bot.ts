import * as dotenv from 'dotenv'
import { Bot } from 'grammy'
dotenv.config()

const token = process.env.BOT_API_KEY as string
if (!token) {
	throw new Error('BOT_API_KEY undefined')
}

const bot = new Bot(token)

bot.command('start', ctx => ctx.reply('Ласкаво просимо! Бот запущений.'))
bot.command('help', ctx => {
	ctx.reply(`Доступні команди:
  /start - Привітання
  /help - Допомога
  /info - Інформація про бота
  /myid - Показати ваш ID
  /time - Поточний час
  /random - Генерація випадкового числа
  /count - Кількість учасників в групі
  /admins - Список адміністраторів групи
  /name - Показує ім'я бота`)
})

bot.command('name', async ctx => {
	const me = await bot.api.getMe()
	await ctx.reply(`Мене звати: ${me.first_name}`)
})

bot.command('info', ctx => {
	ctx.reply('Я - ваш телеграм-бот. Можу допомогти з різними завданнями.')
})

bot.command('myid', ctx => {
	ctx.reply(`Ваш ID: ${ctx.chat.id}`)
})

bot.command('time', ctx => {
	const currentTime = new Date().toLocaleString()
	ctx.reply(`Поточний час: ${currentTime}`)
})

bot.command('random', ctx => {
	const randomNumber = Math.floor(Math.random() * 100) + 1
	ctx.reply(`Ваше випадкове число: ${randomNumber}`)
})

bot.command('count', async ctx => {
	if (ctx.chat.type === 'supergroup' || ctx.chat.type === 'group') {
		try {
			const membersCount = await bot.api.getChatMembersCount(ctx.chat.id)
			ctx.reply(`Кількість учасників: ${membersCount}`)
		} catch (error) {
			ctx.reply('Не вдалося отримати кількість учасників.')
		}
	} else {
		ctx.reply('Ця команда працює тільки в групах!')
	}
})

bot.command('admins', async ctx => {
	if (ctx.chat.type === 'supergroup' || ctx.chat.type === 'group') {
		const admins = await bot.api.getChatAdministrators(ctx.chat.id)
		const adminList = admins.map(admin => admin.user.username).join(', ')
		ctx.reply(`Адміни групи: ${adminList || 'Немає адмінів.'}`)
	} else {
		ctx.reply('Ця команда працює тільки в групах!')
	}
})

bot.on('message', async ctx => {
	console.log('Отримано повідомлення з чату:', ctx.chat)
	console.log('Текст повідомлення:', ctx.message.text)
	await ctx.reply('Я поки що не здатний написати щось більше, ніж команди')
})

bot.start({ drop_pending_updates: false })
