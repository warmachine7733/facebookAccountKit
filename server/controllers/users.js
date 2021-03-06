// const User = require("../models/user");

const Joi = require("joi");
var CryptoJS = require("crypto");
var axios = require("axios");

module.exports = {
  //VALIDATION:DONE
  index: async (req, res, next) => {
    console.log("okay get method is called");
  },
  genUser: async (req, res, next) => {
    var access_token = await axios.get(
      `https://graph.accountkit.com/v1.1/access_token?grant_type=authorization_code&code=${
        req.body.code
      }&access_token=AA|<App_ID>|<App_Secret>`
    );
    const accessToken = access_token.data.access_token;
    const clientSecret = "<App_Secret>";
    const appsecretProof = CryptoJS.createHmac("sha256", clientSecret)
      .update(accessToken)
      .digest("hex");
    let userDetails = await axios.get(
      `https://graph.accountkit.com/v1.1/me/?access_token=${
        access_token.data.access_token
      }&appsecret_proof=${appsecretProof}`
    );
    console.log("store it in db", userDetails.data);
  }
};
