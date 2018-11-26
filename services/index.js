const shortid = require('shortid');
const database = require('../database');
const { PREFIX_USERID, PREFIX_KYCID, KYC_TYPE} = require('../constants');

exports.generateRandUser = async () => {
  let user = getRandomUser();
  let userId = PREFIX_USERID + shortid.generate();
  user.userId = userId;
  for (let i = 0; i < 5; i++) {
    let randKyc = getRandomKyc();
    let kycId = PREFIX_KYCID + shortid.generate();
    randKyc.kycId = kycId;
    user.kyc.push(randKyc)
  }

  let newUser = await database.addUser(user);

  return newUser;
}

exports.getUser = async (userId) => {
  let user = await database.getUser(userId);
  return user;
}

exports.newUser = async (user) => {
  let userId = PREFIX_USERID + shortid.generate();
  user.userId = userId;
  let newUser = await database.addUser(user);
  return newUser;
}

exports.newKyc = async (userId, newKyc) => {
  let updated = await database.addKyc(userId, newKyc);
  return updated;
}

exports.modifyKyc = async (userId, modify) => {
  let kycId = modify.kycId;
  let updated = null;
  // write modification code here
  return updated;
}

let getRandomUser = () => {
  const names = [
    'Aabha',
    'Aadarsh',
    'Bindurekha',
    'Binod',
    'Chetna',
    'Chirag',
    'Debjani',
    'Deepak',
    'Eesha',
    'Eklavya'
  ];

  let user = {
    name: names[Math.floor(Math.random() * names.length)],
    kyc: []
  }

  return user;
}

let getRandomKyc = () => {
  let kycList = Object.values(KYC_TYPE);
  let type = kycList[Math.floor(Math.random() * kycList.length)];
  let validTill = new Date().getTime();
  return {
    type,
    validTill
  }
}