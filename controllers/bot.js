const TelegramBot = require('node-telegram-bot-api')
const token = '1903938146:AAG_ClwVuiXRYCG0s5MEVKTjWDmfuJwNSmw'
const express = require('express')
const UserState = require('../db/UserState');
const {
  ShopifyApi,
} = require('../providers/shopifyApi');
const bot = new TelegramBot(token, { polling: true })
const app = express();

async function handleMessage(req, res) {
    res.status(200).send('');
    const accountSid = req.body.AccountSid;
    const fromNumber = req.body.From;
    const msg = req.body.Body;
    const profileName = req.body.ProfileName;
    console.log('wh controller', fromNumber, msg, req.body);
}

function createNewDialog() {
    UserState
      .create({
        phone: fromNumber,
        last: 'demoMain',
      })
      .then(() => {
        bot.sendMessage(chatId, `Hello! Are you here to receive a discount for Banarasi Outfits ?\n1. Yes\n2. No`)
      }).catch(errorHandler);
  }

bot.onText(/main/, (msg, match) => {
	const chatId = msg.chat.id
	bot.sendMessage(chatId, `Hello! Are you here to receive a discount for Banarasi Outfits ?\n1. Yes\n2. No`)
})

function sendMainMenu() {
    bot.sendMessage(chatId, `Hello! Are you here to receive a discount for Banarasi Outfits ?\n1. Yes\n2. No`)
}

function sendCatalog() {
  shopifyApi.retireveCollections().then((
    response,
  ) => {
    const collections = `Select Collection:\n${
      response.collections.edges
        .map((val, idx) => `${idx + 1}. ${val.node.title}`)
        .join('\n')}\n${backToMenu}\n\n\n${typeRecomendation}`;
        bot.sendMessage(chatId, collections) 
      }
  ).catch(errorHandler)
}

function resendCommand() {
  bot.sendMessage(chatId, 'Please, send right command\nOR type 0 to redirect to main menu')
}