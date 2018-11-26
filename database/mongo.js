const UserModel = require('../models').User;

exports.getUser = async (userId) => {
  let query = { userId };
  let user =
    await UserModel
      .findOne(query)
      .exec();

  return user;
}

exports.addUser = async (newUser) => {
  return new Promise((resolve, reject) => {
    let userModel = new UserModel(newUser);
    userModel.save((err, doc) => {
      if (err) {
        return reject(err);
      }
      return resolve(doc.toObject());
    })
  })
}

exports.addKyc = async (userId, newKyc) => {
  let query = { userId };
  let updated = await UserModel.findOneAndUpdate(
    query, {
      $addToSet: {
        kyc: newKyc
      }
    }, { new: true }).exec();

  return updated;
}