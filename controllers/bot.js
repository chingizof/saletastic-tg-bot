const TelegramBot = require('node-telegram-bot-api')
const token = '1903938146:AAG_ClwVuiXRYCG0s5MEVKTjWDmfuJwNSmw'
const express = require('express')
const UserState = require('../db/UserState');
const {
  ShopifyApi,
} = require('../providers/shopifyApi');
const bot = new TelegramBot(token, { polling: true })
const app = express();
var lastState;


bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "<a href='neprivet.ru/'> Hello!</a> What do you want? ^^", {
    parse_mode: "html",
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
  // var variant1 = "1️⃣ First Variant";
  // if (msg.text.indexOf(variant1) === 0){
  //   bot.sendMessage(msg.chat.id, "xs, s, XL", {
  //     "reply_markup": 
  //         JSON.stringify({
  //           keyboard: [
  //               [{
  //                 text: 'Back to catalog'
  //               }],
  //           ],
  //           resize_keyboard: true,
  //           one_time_keyboard: true
  //         })
        
  //   })
  // }
  // var variant2 = "2️⃣ Second Variant";
  // if (msg.text.indexOf(variant2) === 0){
  //   bot.sendMessage(msg.chat.id, "XXL, XXXXXXXL", {
  //     "reply_markup": 
  //         JSON.stringify({
  //           keyboard: [
  //               [{
  //                 text: 'Back to catalog'
  //               }],
  //           ],
  //           resize_keyboard: true,
  //           one_time_keyboard: true
  //         })
        
  //   })
  // }
  // var variant3 = "3️⃣ Third Variant";
  // if (msg.text.indexOf(variant3) === 0){
  //   bot.sendMessage(msg.chat.id, "Your size is too big for this shirt", {
  //     "reply_markup": 
  //         JSON.stringify({
  //           keyboard: [
  //               [{
  //                 text: 'Back to catalog'
  //               }],
  //           ],
  //           resize_keyboard: true,
  //           one_time_keyboard: true
  //         })
  //   })
  // }
  var variant1 = "1️⃣ First Variant";
  if (msg.text.indexOf(variant1) === 0){
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
    bot.sendMessage(msg.from.id, 'Original Text', opts);
    bot.on("callback_query", (callbackQuery) => {
      const msg = callbackQuery.message;
      bot.answerCallbackQuery(callbackQuery.id)
      .then(() => bot.sendMessage(msg.chat.id, "You clicked!"))
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


