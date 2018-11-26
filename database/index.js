const mongo = require('./mongo');

let GET_USER = {
  MONGO: (userId) => mongo.getUser(userId)
}

let ADD_USER = {
  MONGO: (newUser) => mongo.addUser(newUser)
}

let ADD_KYC = {
  MONGO: (userId, newKyc) => mongo.addKyc(userId, newKyc)
}

const database = 'MONGO';

exports.getUser = GET_USER[database];
exports.addUser = ADD_USER[database];
exports.addKyc = ADD_KYC[database];