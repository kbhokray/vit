const ENV = {
  DEV: 'DEV',
  PROD: 'PROD',
  ADHOC: 'ADHOC'
}
let env = ENV[process.env.ENV] ? ENV[process.env.ENV] : ENV.PROD;

console.log(env);

let CONFIG = () => {
  switch (env) {
    case (ENV.DEV):
      return {
        URL_DB: 'mongodb://localhost/recruitment'
      };
    case (ENV.PROD):
      return {
        URL_DB: 'mongodb://admin:password123@ds125392.mlab.com:25392/vit'
      };
    default:
      return {
        URL_DB: 'mongodb://localhost/recruitment', //'mongodb://admin:password123@ds125392.mlab.com:25392/vit'
      }
  }
}

exports.URL_DB = CONFIG().URL_DB;
exports.URL_FRONTEND = CONFIG().URL_FRONTEND;

exports.RESPONSE_STATUS = {
  OK: 200,
  ERROR: 400
}

exports.RESPONSE_MESSAGE = {
  OK: 'OK',
  ERROR: 'ERROR',
}

exports.Response = function (status, message, result) {
  this.status = status;
  this.message = message;
  this.result = result;
}

exports.KYC_TYPE = {
  PAN: 'PAN',
  AADHAAR: 'AADHAAR',
  VOTERID: 'VOTERID',
  DRIVINGLICENSE: 'DRIVINGLICENSE',
  OTHER: 'OTHER'
}

exports.PREFIX_USERID = 'U_';
exports.PREFIX_KYCID = 'K_';