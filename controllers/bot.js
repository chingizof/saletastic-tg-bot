const TelegramBot = require('node-telegram-bot-api')
const token = '1903938146:AAG_ClwVuiXRYCG0s5MEVKTjWDmfuJwNSmw'
const express = require('express')
const UserState = require('../db/UserState');
const {
  ShopifyApi,
} = require('../providers/shopifyApi');
const bot = new TelegramBot(token, { polling: true })
const app = express();



bot.onText(/main/, (msg, match) => {
	const chatId = msg.chat.id
	bot.sendMessage(chatId, `Hello! Are you here to receive a discount for Banarasi Outfits ?\n1. Yes\n2. No`)
})

bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Hello! What do you want?", {
  "reply_markup": {
      "keyboard": [["Catalog"], ["Support"], ["Order Status"], ["Abandoned Cart"], ["Loyalty Program"]]
      }
  });
  
  });

bot.on('message', (msg) => {
var catalog = "Catalog";
if (msg.text.indexOf(catalog) === 0) {
    bot.sendMessage(msg.chat.id, "Select Collection:");
}
var support = "Support";
if (msg.text.indexOf(support) === 0) {
    bot.sendMessage(msg.chat.id, "Don't write here anymore , Bye");
}
var status = "Order Status";
if (msg.text.indexOf(status) === 0) {
    bot.sendMessage(msg.chat.id, "Your ordes is ready!");
}
var cart = "Abandoned Cart";
if (msg.text.indexOf(cart) === 0){
  bot.sendMessage(msg.chat.id, "Your cart is:")
}
var program = "Loyalty Program";
if (msg.text.indexOf(program) === 0){
  bot.sendMessage(msg.chat.id, "Your discount code: https//:google.com")
}
});


let userLast;
bot.on("callback_query", (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  }
  let text
  userLast = 'main'
  if (action === '1') {
    text = "Here is Catalog"
    userLast = "catalog"
  }
  else if (action ==='2') {
    text = "Here is Support"
    userLast = "support"
  }
  else if (action ==='3') {
    text = "Here is Support"
    userLast = "tracking"
  }
  else if (action ==='4') {
    text = "Here is Support"
    userLast = "Here is your promocode: Please click this link to proceed or type *5* to return"
  }
  else if (action ==='5') {
    text = "Would you like to leave us a review for 5 points?"
    userLast = 'marketing'
  }
  bot.sendMessage(opts)
});


