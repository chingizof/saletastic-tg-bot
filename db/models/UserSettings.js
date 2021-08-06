const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  memberstackId: {
    type: String,
    required: true,
  },
  shopify: Object,
}, {
  collection: 'userSettings',
  timestamps: true,
});

module.exports = mongoose.model('UserSetting', schema);
