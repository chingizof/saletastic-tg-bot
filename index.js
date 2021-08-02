const TelegramBot = require('node-telegram-bot-api')
const token = '1903938146:AAG_ClwVuiXRYCG0s5MEVKTjWDmfuJwNSmw'
const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const {
	ShopifyApi,
} = require('../providers/shopifyApi');


const bot = new TelegramBot(token, { polling: true })
const app = express()

bot.onText(/main/, (msg, match) => {

	const chatId = msg.chat.id
	const resp = match[1]

	bot.sendMessage(chatId, 'h1')
})




app.listen(port, function listen() {
    console.log(`Server is listening at http://localhost:${port}`);
  });