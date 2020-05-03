const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const publicDir = path.join(__dirname, '/public')
const port = process.env.PORT || 5000

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
  const dialog = require('../utils/dialog')
  dialog.changeQuery(query)
  dialog
})

app.get('*', (req, res) => {
  res.send('Error 404')
})

app.listen(port, () => {
  console.log('Server running')
});