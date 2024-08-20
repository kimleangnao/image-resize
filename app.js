const express = require('express')
const app = express()
const path = require('path')

const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')

const index = require('./routes/index.js')
const processImage = require('./routes/processImage.js')

app.use(express.json())

app.use(helmet())
app.use(cors())
app.use(xss())

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, './public')))

//routes
app.use('/', index)
//api
app.use('/api/v1', processImage)

const port = process.env.PORT || 3000

const start = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()
