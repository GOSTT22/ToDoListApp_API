var express = require('express');
var router = express.Router();
const clients = [{ 'id': 1, 'task_name': 'Adam', 'status': 'Todo' },
{ 'id': 2, 'task_name': 'Tony', 'status': 'in Progress' },
{ 'id': 3, 'task_name': 'Excel', 'status': 'Complete' }];



// router.get('*', function(req, res, next) {
//   console.log(req.url)
//   res.json({ title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/clients', function(req, res, next) {
  res.json(clients)
});



module.exports = router;
