const TelegramBot = require('node-telegram-bot-api');
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

let todos = [];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Merhaba! ToDo Bot\'una hoş geldiniz. Aşağıdaki komutları kullanabilirsiniz:\n\n' +
    '/add - Yeni bir ToDo ekler\n' +
    '/list - ToDo listesini görüntüler\n' +
    '/delete - Belirli bir ToDo\'yu siler\n' +
    '/clear - ToDo listesini temizler\n' +
    '/help - Komutları ve kullanımlarını gösterir');
});

bot.onText(/\/add (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const todo = match[1];
  todos.push(todo);
  bot.sendMessage(chatId, 'Yeni bir ToDo eklendi: ' + todo);
});

bot.onText(/\/list/, (msg) => {
  const chatId = msg.chat.id;
  let message = 'ToDo Listesi:\n';
  if (todos.length > 0) {
    todos.forEach((todo, index) => {
      message += `${index + 1}. ${todo}\n`;
    });
  } else {
    message += 'ToDo bulunamadı.';
  }
  bot.sendMessage(chatId, message);
});

bot.onText(/\/delete (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const todoIndex = parseInt(match[1]) - 1;
  if (todoIndex >= 0 && todoIndex < todos.length) {
    const deletedTodo = todos.splice(todoIndex, 1);
    bot.sendMessage(chatId, 'ToDo silindi: ' + deletedTodo);
  } else {
    bot.sendMessage(chatId, 'Geçersiz ToDo indeksi.');
  }
});

bot.onText(/\/clear/, (msg) => {
  const chatId = msg.chat.id;
  todos = [];
  bot.sendMessage(chatId, 'ToDo Listesi temizlendi.');
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Aşağıdaki komutları kullanabilirsiniz:\n\n' +
    '/add todo - Yeni bir ToDo ekler\n' +
    '/list - ToDo listesini görüntüler\n' +
    '/delete todo_index - Belirli bir ToDo\'yu siler\n' +
    '/clear - ToDo listesini temizler\n' +
    '/help - Komutları ve kullanımlarını gösterir');
});

bot.onText(/\/.+/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Geçersiz komut. Lütfen doğru bir komut girin veya /help komutunu kullanarak komutları görüntüleyin.');
});

bot.on('polling_error', (error) => {
  console.log(error);
});
