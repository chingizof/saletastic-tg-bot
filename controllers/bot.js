const TelegramBot = require('node-telegram-bot-api')
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

const mongoDB = '';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const bodyParser = require("body-parser");
const port = 5001;
const url = "https://api.telegram.org/bot";
const apiToken = "";

app.use(bodyParser.json());
// Endpoints
//сообщения телеграм читаются только при '/'
app.post('/', (req,res) => {
  res.sendStatus(200)
  console.log(req.body);
})
app.post('/send', (req, res) => {
    const { to, msg } = req.body;
    console.log(req.body);
    axios // отправляем сообщение
      .post(`${url}${apiToken}/sendMessage`, {
        chat_id: to,
        text: msg,
      })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.send(error);
      });
  });

// Listening
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});