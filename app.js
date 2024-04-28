var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('express-cors')
const dotenv = require("dotenv");
dotenv.config();
//connect
const mongoose = require("mongoose");
// mongoose.connect('mongodb+srv://anatoliygostichev:UZjGk8ZyFxrSzSny@cluster0.rmjjy2g.mongodb.net/todo');
mongoose.connect(
  `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/todo`
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// app.use(cors({
//   allowedOrigins: [
//       'localhost:4200'
//   ]
// }))

app.use(cors({
  origin: ['http://localhost:4200'], // Указывает, с какого источника разрешены запросы
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'], // Список HTTP-методов, которые сервер готов принять
  allowedHeaders: ['Content-Type', 'Authorization'], // Список заголовков, которые разрешено отправлять с запросом
  credentials: true, // Если необходимо поддерживать учетные данные сессии (например, cookies)
  optionsSuccessStatus: 200 // Код ответа для успешных запросов типа OPTIONS
}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
