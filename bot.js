const TelegramBot = require('node-telegram-bot-api')

const token = '7937246200:AAGRqtBY4p77cbnXTJubtM6YlNlAqgUVUuE'
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start_bot/, msg => {
	bot.sendMessage(msg.chat.id, 'Привіт! Я твій Telegram-бот 😊')
})

bot.on('polling_error', error => {
	console.log(error)
})

bot.on('message', msg => {
	const text = msg.text
	const chatId = msg.chat.id

	// Перевірка, чи повідомлення в групі
	if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
		// Відповідь в групі
		bot.sendMessage(chatId, `Ти написав мені: ${text}`)
	}

	if (text === '/info') {
		bot.sendMessage(
			chatId,
			`Тебе звати ${msg.from.first_name} ${msg.from.last_name}`
		)
	}
})

// bot.onText(/\/hello/, msg => {
// 	bot.sendMessage(msg.chat.id, 'Привіт! 😊')
// })
