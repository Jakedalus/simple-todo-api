var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;


app.get('/', function(req, res) {
 res.json({message: 'HI FROM EXPRESS!'});
});

app.listen(port, function() {
  console.log("App is running on port ", port);
});