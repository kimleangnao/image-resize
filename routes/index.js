const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => {
    console.log('home')
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

module.exports = router
