const express = require('express')
const dialog = require('../utils/dialog')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/comm', async (req, res) => {
    try {
        const output = await dialog.runSample(req.query.userquery)
        res.send(output)
    } catch (error) {
        res.send(error)
    }
})

router.get('*', (req, res) => {
    res.send('Error 404: Please don\'t mess around. Go back to home page')
})

module.exports = router