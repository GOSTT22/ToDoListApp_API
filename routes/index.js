var express = require("express");
var router = express.Router();
const Task = require("../models/task");
const jwtwebtoken = require("jsonwebtoken");
const { expressjwt: requireJwt } = require("express-jwt"); // Исправлено
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Миддлвар для валидации токенов
const authenticate = requireJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
}); // Исправлено
console.log(process.env.JWT_SECRET);

// Регистрация пользователя
router.post("/register", async (req, res) => {
  console.log("register");
  const { username, password, email, firstname, lastname } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).send("Пользователь уже существует.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    firstname,
    lastname,
  });
  await newUser.save();
  res.send({ message: "Пользователь успешно зарегистрирован." });
});

// Логин и генерация токена
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !bcrypt.compare(password, user.password)) {
    return res.status(401).send("Неверное имя пользователя или пароль.");
  }
  const token = jwtwebtoken.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.send({ message: "Аутентификация прошла успешно", token });
});

// Защищённый маршрут, требующий аутентификации
router.get("/protected", authenticate, (req, res) => {
  console.log(req.auth);
  res.send(
    `Добро пожаловать, ${req.auth.username}! Вы на защищенной странице.`
  );
});

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/me", authenticate, (req, res) => {
  // Получаем токен из заголовка Authorization
  const token = req.headers.authorization.split(" ")[1];

  // Расшифровываем токен с использованием секретного ключа
  jwtwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error("Ошибка при расшифровке токена:", err);
      res.json({ error: "Ошибка токена" });
      // Обработка ошибки, если токен невалидный
    } else {
      // Данные из расшифрованного токена доступны в decoded
      console.log("Данные из токена:", decoded);
      const username = decoded.username;
      const user = await User.findOne({ username });
      const { _id, email, firstname, lastname } = user;
      const protectedUser = {
        _id,
        username,
        email,
        firstname,
        lastname,
      };
      res.json({ user: protectedUser });
    }
  });
});

router.get("/api/clients", authenticate, async function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwtwebtoken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error("Ошибка при расшифровке токена:", err);
      res.json({ error: "Ошибка токена" });
      // Обработка ошибки, если токен невалидный
    } else {
      const username = decoded.username;
      const user = await User.findOne({ username });
      const { _id, email, firstname, lastname } = user;
      Task.find({authorId:_id}).then((tasks) => {
        res.json(tasks);
      });
    }
  });

  
});

router.post("/api/clients",  function (req, res, next) {
  console.log(req.body);
  delete req.body._id;
  const task = new Task(req.body);
  task.save().then(() => console.log("meow"));
  res.json({ ok: true });
});

router.put("/api/clients/:id", function (req, res, next) {
  const id = req.params.id;
  console.log(req.body);
  Task.findByIdAndUpdate(id, req.body).then((task) => {
    res.json({ ok: true });
    console.log(task);
  });
});

router.delete("/api/clients/:id", function (req, res, next) {
  const id = req.params.id;
  console.log(req.body);
  Task.findByIdAndDelete(id).then((task) => {
    res.json({ ok: true });
    console.log(task);
  });
});

module.exports = router;
