var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Hello from todos route');
});

module.exports = router;