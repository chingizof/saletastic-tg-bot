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
  bot.sendMessage(msg.chat.id, "Hello! What do you want?", {
    "reply_markup": // создаем кнопки
        JSON.stringify({
          keyboard: [
              [{
                text: 'Catalog'
              }],
              [{
                text: 'Support'
              }],
              [{
                text: 'Order Status'
              }],
              [{
                text: 'Abandoned Cartr'
              }],
              [{
                text: 'Loyalty Program'
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
  var backMenu = "Back to menu"
  if (msg.text.indexOf(backMenu) === 0) {
    bot.sendMessage(msg.chat.id, "Hello! What do you want?", {
      "reply_markup": 
          JSON.stringify({
            keyboard: [
                [{
                  text: 'Catalog'
                }],
                [{
                  text: 'Support'
                }],
                [{
                  text: 'Order Status'
                }],
                [{
                  text: 'Abandoned Cartr'
                }],
                [{
                  text: 'Loyalty Program'
                }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true 
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
                text: 'First Variant'
              }],
              [{
                text: 'Second Variant'
              }],
              [{
                text: 'Third Variant'
              }],
              [{
                text: 'Back to menu'
              }]
          ],
          resize_keyboard: true,
          one_time_keyboard: true
        })
    });
  }
  // кнопки основного меню
  var catalog = "Catalog";
  if (msg.text.indexOf(catalog) === 0) {
      bot.sendMessage(msg.chat.id, "Select Collection:", {
        "reply_markup":
          JSON.stringify({
            keyboard: [
                [{
                  text: 'First Variant'
                }],
                [{
                  text: 'Second Variant'
                }],
                [{
                  text: 'Third Variant'
                }],
                [{
                  text: 'Back to menu'
                }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          })
      });
  }
  var support = "Support";
  if (msg.text.indexOf(support) === 0) {
    bot.sendMessage(msg.chat.id, "Don't write here anymore , Bye", {
      "reply_markup": 
          JSON.stringify({
            keyboard: [
                [{
                  text: 'Back to menu'
                }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          })
        
    });
  }
  var status = "Order Status";
  if (msg.text.indexOf(status) === 0) {
    bot.sendMessage(msg.chat.id, "Your ordes is ready!", {
      "reply_markup": 
          JSON.stringify({
            keyboard: [
                [{
                  text: 'Back to menu'
                }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          })
        
    });
  }
  var cart = "Abandoned Cart";
  if (msg.text.indexOf(cart) === 0){
    bot.sendMessage(msg.chat.id, "Your cart is:", {
      "reply_markup": 
          JSON.stringify({
            keyboard: [
                [{
                  text: 'Back to menu'
                }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          })
        
    })
  }
  var program = "Loyalty Program";
  if (msg.text.indexOf(program) === 0){
    bot.sendMessage(msg.chat.id, "Your discount code: https//:google.com", {
      "reply_markup": 
          JSON.stringify({
            keyboard: [
                [{
                  text: 'Back'
                }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          })
        
    })
  }
  // Variants
  var variant1 = "First Variant";
  if (msg.text.indexOf(variant1) === 0){
    bot.sendMessage(msg.chat.id, "xs, s, XL", {
      "reply_markup": 
          JSON.stringify({
            keyboard: [
                [{
                  text: 'Back to catalog'
                }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          })
        
    })
  }
  var variant2 = "Second Variant";
  if (msg.text.indexOf(variant2) === 0){
    bot.sendMessage(msg.chat.id, "XXL, XXXXXXXL", {
      "reply_markup": 
          JSON.stringify({
            keyboard: [
                [{
                  text: 'Back to catalog'
                }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          })
        
    })
  }
  var variant3 = "Third Variant";
  if (msg.text.indexOf(variant3) === 0){
    bot.sendMessage(msg.chat.id, "Your size is too big for this shirt", {
      "reply_markup": 
          JSON.stringify({
            keyboard: [
                [{
                  text: 'Back to catalog'
                }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          })
    })
  }
});





