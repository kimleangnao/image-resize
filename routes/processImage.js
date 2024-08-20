const express = require('express')
const multer = require('multer')

const router = express.Router()

const { processImages } = require('../controllers/processImage')

const upload = multer({ dest: 'uploads/' })

router.post('/images', upload.single('image'), processImages)

module.exports = router
