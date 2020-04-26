const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dialog = require('../utils/dialog')
const port = 5000
const publicDir = path.join(__dirname, '/public')

app.use(express.static(publicDir))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.post('/sent', (req, res) => {
  let query = JSON.stringify(req.body)
  dialog.changeQuery(query)
})

app.listen(port, () => {
  console.log('Server running')
});