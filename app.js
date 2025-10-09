require("dotenv").config();

<<<<<<< HEAD
require('./models/connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const tweetsRouter = require('./routes/tweets');
=======
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
>>>>>>> 373960da14f3527b5eeb3a5fe70b3a90f86e3de7

var app = express();
const cors = require("cors");
app.use(cors());

<<<<<<< HEAD
const cors = require("cors");
app.use(cors());

app.use(logger('dev'));
=======
app.use(logger("dev"));
>>>>>>> 373960da14f3527b5eeb3a5fe70b3a90f86e3de7
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);
=======
app.use("/", indexRouter);
app.use("/users", usersRouter);
>>>>>>> 373960da14f3527b5eeb3a5fe70b3a90f86e3de7

module.exports = app;




