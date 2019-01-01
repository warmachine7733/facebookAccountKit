const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(userController.index)
  .post(userController.genUser);
module.exports = router;
