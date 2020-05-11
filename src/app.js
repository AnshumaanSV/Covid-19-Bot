const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const homeRouter = require('./routes/home')
const port = process.env.PORT || 5000

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates')

app.set('view engine', 'hbs')
app.set('views', viewsDir)
app.use(express.static(publicDir))
app.use(homeRouter)

app.listen(port, () => {
    console.log('Server running')
})