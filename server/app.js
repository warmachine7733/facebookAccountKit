const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const cors = require("cors");



// mongoose.Promise = global.Promise;
const helmet = require("helmet");

//for .env file read
require("dotenv").config();

const app = express();
app.use(helmet());

//getting routes

const home = require("./routes/home");

//middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
//using routes
app.use("/", home);

app.use((req, res, err, next) => {
  const error = app.get("env") === "developement" ? err : {};
  const status = err.status || status;

  //client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  console.log(err);
});

//server
//console.log(process.env)
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is running at ${port}`));
