const express = require('express')
const app = express();
const url = 'https://webhook.site/15f9c25f-fb95-41d2-9bda-0940da5ec492'
// later...
const bot = require('./controllers/bot');
bot.setWebhook(url);
app.use(`/15f9c25f-fb95-41d2-9bda-0940da5ec492`, require('./routes/message'));

module.exports = app