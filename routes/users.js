let express = require('express');
let router = express.Router();
let service = require('../services');

router.post('/randUser', function (req, res, next) {
  let promise = new Promise((resolve, reject) => {
    service.generateRandUser()
      .then((newUser) => {
        resolve(newUser);
      }).catch((error) => {
        reject(error.message);
      })
  });
  res.promise(promise);
});

router.post('/user', function (req, res, next) {
  let user = req.body.user;
  let promise = new Promise((resolve, reject) => {
    service.newUser(user)
      .then((newUser) => {
        resolve(newUser);
      }).catch((error) => {
        reject(error.message);
      })
  });
  res.promise(promise);
});

/* GET users listing. */
router.get('/:userId', function (req, res, next) {
  let userId = req.params.userId;
  let promise = new Promise((resolve, reject) => {
    service.getUser(userId)
      .then((user) => {
        resolve(user);
      }).catch((error) => {
        reject(error.message);
      })
  });
  res.promise(promise);
});

router.post('/:userId/kyc', (req, res) => {
  let userId = req.params.userId;
  let update = req.body.update;
  let promise = new Promise((resolve, reject) => {
    service.newKyc(userId, update.new)
      .then((updatedUser) => {
        resolve(updatedUser);
      }).catch((error) => {
        reject(error.message);
      })
  });

  res.promise(promise);
});

router.put('/:userId/kyc', (req, res) => {
  let update = req.body.update;
  let promise = new Promise((resolve, reject) => {
    service.modifyKyc(update.modify)
      .then((updatedUser) => {
        resolve(updatedUser);
      }).catch((error) => {
        reject(error.message);
      })
  });

  res.promise(promise);
});

module.exports = router;
