const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { KYC_TYPE } = require('../constants');

let userSchema = new Schema({
  userId: String,
  name: String,
  kyc: [{
    kycId: String,
    type: {
      type: String,
      enum: Object.values(KYC_TYPE),
    },
    validTill: Number
  }]
})

exports.User = mongoose.model('User', userSchema);