const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserDataSchema = new Schema({
  chatId: { type: Number, required: true },
  catalogs: [Object],
  products: [Object],
  variants: [Object],
  checkoutCreate: Object,
  itemsCart: [Object],
}, { collection: 'UserData' });

module.exports = mongoose.model('UserData', UserDataSchema);
