const TelegramBot = require('node-telegram-bot-api')
const token = '1904259926:AAHF3QR-hDQp-WedL_9jR3meADtOUVMnofY'
const express = require('express')
const axios = require('axios')
const {
  shopifyApi,
} = require('../providers/shopifyApi');
const UserData = require('../db/models/UserData');
const UserSettings = require('../db/models/UserSettings');
const bot = new TelegramBot(token, { polling: true })
const app = express();
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://nurlan:qweQWE123@cluster0.ikiuf.mongodb.net/tgdb?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//обьявление функций
function sendCatalog() {
  console.log('catalog works')
  shopifyApi.retireveCollections().then((
    response,
  ) => {
    console.log('im here')
    const collections = `Select Collection:\n${
      response.collections.edges
        .map((val, idx) => `${idx + 1}. ${val.node.title}`)
        .join('\n')}\n${backToMenu}\n\n\n${typeRecomendation}`;
    bot.sendMessage(msg.chat.id, collections)
    UserState.updateOne(
      {
        chatId: msg.chat.id,
      },
      {
        catalogs: response.collections.edges,
      },
    ).exec();
  }).catch(errorHandler);
}

bot.onText(/\/start/, (msg) => {
  // проверяем существует ли пользователь в базе
  UserData.findOne({
      chatId: msg.chat.id,
    },
    (err, result) => {
      if (err) {
        return console.log(err);
      }
      if (!result) {
        UserData
          .create({
            chatId: msg.chat.id
          })
        }
      return result;
    });

  //отправляем приветствие
  bot.sendMessage(msg.chat.id, "Hello! What do you want? ^^", {
    "reply_markup": // создаем кнопки
        JSON.stringify({
          keyboard: [
              [{
                text: '📕 Catalog'
              }],
              [{
                text: '🆘 Support'
              }],
              [{
                text: '📦 Order Status'
              }],
              [{
                text: '🛒 Abandoned Cart'
              }],
              [{
                text: '😎 Loyalty Program'
              }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true //кнопка пропадает после нажатия
        })
      
  });  
});

// ответы на кнопки
bot.on('message', (msg) => {
  // кнопки back
  var backMenu = "🔙 Back to menu";
  if (msg.text.indexOf(backMenu) === 0){
    bot.sendMessage(msg.chat.id, "What do you want?^_^", {
      "reply_markup": // создаем кнопки
        JSON.stringify({
          keyboard: [
              [{
                text: '📕 Catalog'
              }],
              [{
                text: '🆘 Support'
              }],
              [{
                text: '📦 Order Status'
              }],
              [{
                text: '🛒 Abandoned Cart'
              }],
              [{
                text: '😎 Loyalty Program'
              }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true //кнопка пропадает после нажатия
        })
        
    }); 
  }

  var backCatalog = "Back to catalog";
  if (msg.text.indexOf(backCatalog) === 0){
    // sendCatalog()
    bot.sendMessage(msg.chat.id, "Select Collection:", {
      "reply_markup":
        JSON.stringify({
          keyboard: [
              [{
                text: '1️⃣ First Variant'
              }],
              [{
                text: '2️⃣ Second Variant'
              }],
              [{
                text: '3️⃣ Third Variant'
              }],
              [{
                text: '🔙 Back to menu'
              }]
          ],
          resize_keyboard: true,
          one_time_keyboard: true
        })
    });
  }
  // кнопки основного меню
  var catalog = "📕 Catalog";
  if (msg.text.indexOf(catalog) === 0) {
    //sendCatalog();
    bot.sendMessage(msg.chat.id, '░░░░░░░░░░░░░░░░░░░░ ░░░░░ЗАПУСКАЕМ░░░░░░░ ░ГУСЯ░▄▀▀▀▄░РАБОТЯГИ░░ ▄███▀░◐░░░▌░░░░░░░░░ ░░░░▌░░░░░▐░░░░░░░░░ ░░░░▐░░░░░▐░░░░░░░░░ ░░░░▌░░░░░▐▄▄░░░░░░░ ░░░░▌░░░░▄▀▒▒▀▀▀▀▄ ░░░▐░░░░▐▒▒▒▒▒▒▒▒▀▀▄ ░░░▐░░░░▐▄▒▒▒▒▒▒▒▒▒▒▀▄ ░░░░▀▄░░░░▀▄▒▒▒▒▒▒▒▒▒▒▀▄ ░░░░░░▀▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▀▄ ░░░░░░░░░░░▌▌░▌▌░░░░░ ░░░░░░░░░░░▌▌░▌▌░░░░░ ░░░░░░░░░▄▄▌▌▄▌▌░░░░░')
    bot.sendMessage(msg.chat.id, "Select Collection:", {
      "reply_markup":
        JSON.stringify({
          keyboard: [
              [{
                text: '1️⃣ First Variant'
              }],
              [{
                text: '2️⃣ Second Variant'
              }],
              [{
                text: '3️⃣ Third Variant'
              }],
              [{
                text: '🔙 Back to menu'
              }]
          ],
          resize_keyboard: true,
          remove_keyboard: true
        })
    });
  }
  var support = "🆘 Support";
  if (msg.text.indexOf(support) === 0) {
    bot.sendPhoto(msg.chat.id, "https://pbs.twimg.com/media/EX4tdl_WsAEJiVy.jpg", {caption: "I'm Kazakh /125"})
    bot.sendPhoto(msg.chat.id, "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsports.kz%2Fupload%2F2019-06%2F500_5cfd5ac525c05.jpg&imgrefurl=https%3A%2F%2Fwww.sports.kz%2Fnews%2Fggg-vyibil-iz-nego-dushu-kak-v-mire-otreagirovali-na-pobedu-golovkina&tbnid=oRbMl1LPDI0ywM&vet=12ahUKEwjij4rHvpbyAhXNBXcKHe36CTgQMygAegUIARCRAQ..i&docid=X_HMRvWoBnthZM&w=500&h=300&q=ggg&ved=2ahUKEwjij4rHvpbyAhXNBXcKHe36CTgQMygAegUIARCRAQ", {caption: 'this is my game /124'})
    bot.sendPhoto(msg.chat.id, "https://i.pinimg.com/236x/8b/63/84/8b63843d4164685e44127a49b6f0ceb0.jpg", {caption: "who da fuck is this /126"})
    bot.sendPhoto(msg.chat.id, "https://pbs.twimg.com/media/CsBMepXWgAExt22.jpg", {caption: "mama im on a tv /123"})
  }
  var status = "📦 Order Status";
  if (msg.text.indexOf(status) === 0) {
    bot.sendMessage(msg.chat.id, "Your ordes is ready!", {
      "reply_markup":
        JSON.stringify({
          keyboard: [
              [{
                text: '🔙 Back to menu'
              }]
          ],
          resize_keyboard: true,
          one_time_keyboard: true
        })
    })
  }
  var cart = "🛒 Abandoned Cart"
  if (msg.text.indexOf(cart) === 0){
    bot.sendMessage(msg.chat.id, "Your cart is:", {
      "reply_markup":
        JSON.stringify({
          keyboard: [
              [{
                text: '🔙 Back to menu'
              }]
          ],
          resize_keyboard: true,
          one_time_keyboard: true
        })
    })
  }
  var program = "😎 Loyalty Program";
  if (msg.text.indexOf(program) === 0){
    bot.sendMessage(msg.chat.id, "Your discount code @_@ : https//:google.com", {
      "reply_markup":
        JSON.stringify({
          keyboard: [
              [{
                text: '🔙 Back to menu'
              }]
          ],
          resize_keyboard: true,
          one_time_keyboard: true
        })
    })
  }
  // Variants

  var variant1 = "1️⃣ Variant";
  if (msg.text.indexOf(variant1) === 0){
    var opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Order this',
              callback_data: 'dress'
            },
          ]
        ]
      }
    };

    bot.sendMessage(msg.from.id, 'Original Text', opts);
    bot.on("callback_query", (callbackQuery) => {
      const msg = callbackQuery.message;
      bot.answerCallbackQuery(callbackQuery.id)
      .then(() => bot.sendMessage(msg.chat.id, "You clicked!"))
    });
  }
  var variant2 = '2️⃣ Second Variant';
  if (msg.text.indexOf(variant2) === 0){
    var opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Order this',
              callback_data: 'Hat'
            },
          ]
        ]
      }
    };
    bot.sendMessage(msg.from.id, 'Original Text', opts);
    bot.on("callback_query", (callbackQuery) => {
      const msg = callbackQuery.message;
      bot.answerCallbackQuery(callbackQuery.id)
      .then(() => bot.sendMessage(msg.chat.id, "You clicked 2nd button!"))
    });
  }
  var variant3 = '3️⃣ Third Variant';
  if (msg.text.indexOf(variant3) === 0){
    var opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Order this',
              callback_data: 'Shirt'
            },
          ]
        ]
      }
    };
    bot.sendMessage(msg.from.id, 'Original Text', opts);
    bot.on("callback_query", (callbackQuery) => {
      const msg = callbackQuery.message;
      bot.answerCallbackQuery(callbackQuery.id)
      .then(() => bot.sendMessage(msg.chat.id, "You clicked 3rd button!"))
    });
  }
});

bot.onText(/\/sendpic/, (msg) => {
  var opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Dress',
            callback_data: 'dress'
          },
          {
            text: 'Hat',
            callback_data: 'hat'
          },
          {
            text: 'backpack',
            callback_data: 'backpack'
          },
          {
            text: 'iphone',
            callback_data: 'iphone'
          },
        ]
      ]
    }
  };
  bot.sendPhoto(msg.chat.id,"https://www.google.com/imgres?imgurl=https%3A%2F%2Fsports.kz%2Fupload%2F2019-06%2F500_5cfd5ac525c05.jpg&imgrefurl=https%3A%2F%2Fwww.sports.kz%2Fnews%2Fggg-vyibil-iz-nego-dushu-kak-v-mire-otreagirovali-na-pobedu-golovkina&tbnid=oRbMl1LPDI0ywM&vet=12ahUKEwjij4rHvpbyAhXNBXcKHe36CTgQMygAegUIARCRAQ..i&docid=X_HMRvWoBnthZM&w=500&h=300&q=ggg&ved=2ahUKEwjij4rHvpbyAhXNBXcKHe36CTgQMygAegUIARCRAQ", opts);
  bot.on("callback_query", (callbackQuery) => {
    const msg = callbackQuery.message;
    bot.answerCallbackQuery(callbackQuery.id)
    .then(() => bot.sendMessage(msg.chat.id, "You clicked!"))
  });
});

bot.onText(/\/123/, (msg) => {
  bot.sendMessage(msg.chat.id, "Your monkey is 123 years old")
})
bot.onText(/\/124/, (msg) => {
  bot.sendMessage(msg.chat.id, "Your monkey is 124 years old")
})
bot.onText(/\/125/, (msg) => {
  bot.sendMessage(msg.chat.id, "Your monkey is 125 years old")
})
bot.onText(/\/126/, (msg) => {
  bot.sendMessage(msg.chat.id, "window is an exit")
})

// отправление оплаты через inline
bot.on("inline_query", (query) => {
  var queryResults = [ ];  
  queryResults.push({
      type: 'article',
      id: '0',
      title: `Saletastic 1 month`,
      description: `Best user experience`,
      input_message_content: {
          title: 'Saletastic Company 1 month subscription',
          description: 'Best user experience',
          payload: 'payload',
          provider_token: '410694247:TEST:6250b730-fd82-4a39-a3cf-5a0b7869f2d1',
          currency: 'KZT',
          prices: [
              {
                  label: 'saletastic demo',
                  amount: 30000
              },
              {
                  label: 'saletastic premium',
                  amount: 35000
              }
          ],
      photo_url: 'https://i1.wp.com/useavalanche.com/wp-content/uploads/2021/01/cropped-logo_transparent.png?fit=512%2C512&ssl=1',
      photo_width: 512,
      photo_height: 512,
      need_name: false,
      need_phone_number: true,
      need_email: false,
      need_shipping_address: false,
      is_flexible: false, //цена товара неизмена независим от способа доставки
      }
  });
  queryResults.push({
      type: 'article',
      id: '1',
      title: `Saletastic 3 month`,
      description: `Best user experience`,
      input_message_content: {
          title: 'Saletastic Company 3 month subscription',
          description: 'Best user experience',
          payload: 'payload',
          provider_token: '410694247:TEST:6250b730-fd82-4a39-a3cf-5a0b7869f2d1',
          currency: 'KZT',
          prices: [
              {
                  label: 'saletastic demo',
                  amount: 80000
              },
              {
                  label: 'saletastic premium',
                  amount: 100000
              }
          ],
      photo_url: 'https://i1.wp.com/useavalanche.com/wp-content/uploads/2021/01/cropped-logo_transparent.png?fit=512%2C512&ssl=1',
      photo_width: 512,
      photo_height: 512,
      need_name: false,
      need_phone_number: true,
      need_email: false,
      need_shipping_address: false,
      is_flexible: false, //цена товара неизмена независим от способа доставки
      }
  });
  queryResults.push({
      type: 'article',
      id: '2',
      title: `Saletastic 1 year`,
      description: `Best user experience`,
      input_message_content: {
          title: 'Saletastic Company 1 year subscription',
          description: 'Best user experience',
          payload: 'payload',
          provider_token: '410694247:TEST:6250b730-fd82-4a39-a3cf-5a0b7869f2d1',
          currency: 'KZT',
          prices: [
              {
                  label: 'saletastic demo',
                  amount: 300000
              },
              {
                  label: 'saletastic premium',
                  amount: 350000
              }
          ],
      photo_url: 'https://i1.wp.com/useavalanche.com/wp-content/uploads/2021/01/cropped-logo_transparent.png?fit=512%2C512&ssl=1',
      photo_width: 512,
      photo_height: 512,
      need_name: false,
      need_phone_number: true,
      need_email: false,
      need_shipping_address: false,
      is_flexible: false, //цена товара неизмена независим от способа доставки
      }
  });
  bot.answerInlineQuery(query.id, queryResults);
});

//оплата внутри бота
bot.onText(/\/pay/, msg => {
  const chatID = msg.chat.id;
  bot.sendInvoice(
    chatID,
    'Saletastic Company 1 month subscription',
    'Best user experience',
    'payload',
    '410694247:TEST:6250b730-fd82-4a39-a3cf-5a0b7869f2d1',
    'SOME_RANDOM_STRING_KEY',
    'KZT',
    [
      {
                label: 'saletastic demo',
                amount: 30000
            },
            {
                label: 'saletastic premium',
                amount: 35000
            }
    ],
    {
      photo_url: 'https://i1.wp.com/useavalanche.com/wp-content/uploads/2021/01/cropped-logo_transparent.png?fit=512%2C512&ssl=1',
      photo_width: 512,
      photo_height: 512,
      need_name: false,
      need_phone_number: true,
      need_email: false,
      need_shipping_address: false,
      is_flexible: false, //цена товара неизмена независим от способа доставки
    }
  );

    bot.sendInvoice(
    chatID,
    'Saletastic Company 3 month subscription',
    'Best user experience',
    'payload',
    '410694247:TEST:6250b730-fd82-4a39-a3cf-5a0b7869f2d1',
    'SOME_RANDOM_STRING_KEY',
    'KZT',
    [
      {
                label: 'saletastic demo',
                amount: 80000
            },
            {
                label: 'saletastic premium',
                amount: 100000
            }
    ],
    {
      photo_url: 'https://i1.wp.com/useavalanche.com/wp-content/uploads/2021/01/cropped-logo_transparent.png?fit=512%2C512&ssl=1',
      photo_width: 512,
      photo_height: 512,
      need_name: false,
      need_phone_number: true,
      need_email: false,
      need_shipping_address: false,
      is_flexible: false, //цена товара неизмена независим от способа доставки
    }
  );
    bot.sendInvoice(
    chatID,
    'Saletastic Company 1 year subscription',
    'Best user experience',
    'payload',
    '410694247:TEST:6250b730-fd82-4a39-a3cf-5a0b7869f2d1',
    'SOME_RANDOM_STRING_KEY',
    'KZT',
    [
      {
                label: 'saletastic demo',
                amount: 300000
            },
            {
                label: 'saletastic premium',
                amount: 350000
            }
    ],
    {
      photo_url: 'https://i1.wp.com/useavalanche.com/wp-content/uploads/2021/01/cropped-logo_transparent.png?fit=512%2C512&ssl=1',
      photo_width: 512,
      photo_height: 512,
      need_name: false,
      need_phone_number: true,
      need_email: false,
      need_shipping_address: false,
      is_flexible: false, //цена товара неизмена независим от способа доставки
    }
  );
});

