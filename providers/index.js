const UserSetting = require('../db/models/UserSettings');
const TemporarySandboxUser = require('../db/models/TemporarySandboxUser');
const TelegramBot = require('node-telegram-bot-api')

const { ShopifyApi } = require('./shopifyApi');

const getProviders = async (req) => {
    const fromNumber = req.body.From;
    const msg = req.body.Body;
    let userSettings = null;
    let shopifyApi = null;
    let firstlyJoined = false;
  
    
    if (msg.startsWith('join ')) {
    const shopExternalUrl = msg.substring(4).trim();
    console.log('msg from telegram:', msg);
    userSettings = await UserSetting.findOne({ 'shopify.externalUrl': shopExternalUrl }).exec();
    if (!userSettings) {
        console.log('not found userSettings with "shopify.externalUrl":', shopExternalUrl);
        bot.sendMessage(msg.chat.id, 'store not found');
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
    bot.sendMessage(msg.chat.id, 'join to store before');
    return null;
    }

    userSettings = await UserSetting.findById(temporarySandboxUser.settingsId);
    shopifyApi = ShopifyApi(userSettings.shopify);
    return {
    shopifyApi, accountSid, userSettings, firstlyJoined,
    };
}
shopifyApi = ShopifyApi(userSettings.shopify);
  
  module.exports = { getProviders };
  
