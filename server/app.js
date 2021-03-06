var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());

var corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

app.get('/getTaskLists', function (req, res) {
  fs.readFile(__dirname + '/sample.json', 'utf8', function (err, data) {
    res.end(data);
  });
});

app.post('/updateTaskLists', function (req, res) {
  const data = JSON.stringify(req.body);
  fs.writeFile(__dirname + '/sample.json', data, 'utf8', function (err, data) {
    res.end(
      JSON.stringify({
        status: 'success',
      })
    );
  });
});

app.listen(4000, function () {
  console.log('app listening at http://localhost:4000');
});
