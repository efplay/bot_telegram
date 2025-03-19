"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const grammy_1 = require("grammy");
dotenv.config();
const token = process.env.BOT_API_KEY;
if (!token) {
    throw new Error('BOT_API_KEY undefined');
}
const bot = new grammy_1.Bot(token);
bot.command('start', ctx => ctx.reply('Ласкаво просимо! Бот запущений.'));
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
  /name - Показує ім'я бота`);
});
bot.command('name', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const me = yield bot.api.getMe();
    yield ctx.reply(`Мене звати: ${me.first_name}`);
}));
bot.command('info', ctx => {
    ctx.reply('Я - ваш телеграм-бот. Можу допомогти з різними завданнями.');
});
bot.command('myid', ctx => {
    ctx.reply(`Ваш ID: ${ctx.chat.id}`);
});
bot.command('time', ctx => {
    const currentTime = new Date().toLocaleString();
    ctx.reply(`Поточний час: ${currentTime}`);
});
bot.command('random', ctx => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    ctx.reply(`Ваше випадкове число: ${randomNumber}`);
});
bot.command('count', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.chat.type === 'supergroup' || ctx.chat.type === 'group') {
        try {
            const membersCount = yield bot.api.getChatMembersCount(ctx.chat.id);
            ctx.reply(`Кількість учасників: ${membersCount}`);
        }
        catch (error) {
            ctx.reply('Не вдалося отримати кількість учасників.');
        }
    }
    else {
        ctx.reply('Ця команда працює тільки в групах!');
    }
}));
bot.command('admins', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.chat.type === 'supergroup' || ctx.chat.type === 'group') {
        const admins = yield bot.api.getChatAdministrators(ctx.chat.id);
        const adminList = admins.map(admin => admin.user.username).join(', ');
        ctx.reply(`Адміни групи: ${adminList || 'Немає адмінів.'}`);
    }
    else {
        ctx.reply('Ця команда працює тільки в групах!');
    }
}));
bot.on('message', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Отримано повідомлення з чату:', ctx.chat);
    console.log('Текст повідомлення:', ctx.message.text);
    yield ctx.reply('Я поки що не здатний написати щось більше, ніж команди');
}));
bot.start({ drop_pending_updates: false });
