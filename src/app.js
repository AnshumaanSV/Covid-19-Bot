const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const dialog = require('../src/utils/dialog')

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates')

app.set('view engine', 'hbs')
app.set('views', viewsDir)
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/comm', (req, res) => {
    dialog.runSample(req.query.userquery, ({message}) => {
        res.send({message})
    })
})

app.listen(5000)