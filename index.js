var express = require('express'),
  app = express();

var port = process.env.PORT || 3000;


app.get('/', function(req, res) {
 res.send('HI FROM EXPRESS!');
});

app.listen(port, function() {
  console.log("App is running on port ", port);
});