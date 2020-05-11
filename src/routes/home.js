const express = require('express')
const dialog = require('../utils/dialog')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/comm', (req, res) => {
    dialog.runSample(req.query.userquery, ({message}) => {
        res.send({message})
    })
})

router.get('*', (req, res) => {
    res.send('Error 404: Please don\'t mess around. Go back to home page')
})

module.exports = router