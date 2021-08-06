const TelegramBot = require('node-telegram-bot-api')
const token = '1903938146:AAG_ClwVuiXRYCG0s5MEVKTjWDmfuJwNSmw'
const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const mongoose = require('mongoose');

const bot = new TelegramBot(token, { polling: true })
const app = express()


const mongoDB = 'mongodb+srv://nurlan:qweQWE123@cluster0.ikiuf.mongodb.net/tgdb?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const getProviders = async (req) => {
  const accountSid = req.body.AccountSid;
  const fromNumber = req.body.From;
  const msg = req.body.Body;
  let userSettings = null;
  let shopifyApi = null;
  let msgCtrl = null;
  let firstlyJoined = false;

  if (!accountSid) {
    console.log('accountSid not found in request', fromNumber, msg);
    if (msg.startsWith('join ')) {
      const shopExternalUrl = msg.substring(4).trim();
      console.log('msg from whatsap:', msg);
      userSettings = await UserSetting.findOne({ 'shopify.externalUrl': shopExternalUrl }).exec();
      if (!userSettings) {
        console.log('not found userSettings with "shopify.externalUrl":', shopExternalUrl);
        msgCtrl.sendMsg({ fromNumber, msg: 'store not found' });
        return null;
      }

      await TemporarySandboxUser.updateOne({ phone: fromNumber }, {
        settingsId: userSettings.id,
      }, {
        upsert: true,
      }).exec();
      firstlyJoined = true;
    }

    const temporarySandboxUser = await TemporarySandboxUser.findOne({ phone: fromNumber }).exec();
    if (!temporarySandboxUser) {
      msgCtrl.sendMsg({ fromNumber, msg: 'join to store before' });
      return null;
    }

    userSettings = await UserSetting.findById(temporarySandboxUser.settingsId);
    shopifyApi = ShopifyApi(userSettings.shopify);
    return {
      msgCtrl, shopifyApi, accountSid, userSettings, firstlyJoined,
    };
  }
  shopifyApi = ShopifyApi(userSettings.shopify);
}
module.exports = { getProviders };
