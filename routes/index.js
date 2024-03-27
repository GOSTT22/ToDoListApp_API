var express = require("express");
var router = express.Router();
const Task = require("../models/task");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/api/clients", function (req, res, next) {
  Task.find({}).then((tasks) => {
    res.json(tasks);
  });
});

router.post("/api/clients", function (req, res, next) {
  console.log(req.body);
  const task = new Task(req.body);
  task.save().then(() => console.log("meow"));
  res.json({ ok: true });
});

router.put("/api/clients/:id", function (req, res, next) {
  const id = req.params.id;
  console.log(req.body);
  Task.findByIdAndUpdate(id, req.body).then(task => {
    res.json({ ok: true });
    console.log(task);
  })

});

module.exports = router;
