const express = require('express');
const chalk = require('chalk');
const app = express();
const bodyParser = require('body-parser');
const dialog = require('./dialog')
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


let query = "";

app.post('/sent', (req, res) => {
  query = JSON.stringify(req.body);
  dialog.changeQuery(query);
})

app.listen(port, () => {
  console.log('Server running');
});