const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

const processImages = (req, res) => {
    const width = req.body.width
    const height = req.body.height

    const algo = req.body.algo
    //const scale = req.body.scale

    const inputPath = path.resolve(req.file.path)

    const outputPath = path.resolve(
        'uploads',
        `processed_${Math.floor(Math.random() * 100000)}_${req.file.originalname}`
    )

    // Construct the absolute path to the Python script
    const pythonScriptPath = path.resolve(
        __dirname,
        '../python/image_processing.py'
    )

    // Example processing command (replace with actual processing logic)
    const command = `python ${pythonScriptPath} ${inputPath} ${outputPath} ${width} ${height} ${algo}`

    exec(command, (err, stdout, stderr) => {
        if (err) {
            console.log(stderr)
            return res.status(500).send('Image processing failed')
        }
        res.download(outputPath, (err) => {
            if (err) {
                return res.status(500).send('Server Error')
            }
            //console.log('download sent')
            // Clean up files
            fs.unlink(inputPath, (unlinkErr) => {
                if (unlinkErr)
                    console.error(`Failed to delete input file: ${unlinkErr}`)
            })
            fs.unlink(outputPath, (unlinkErr) => {
                if (unlinkErr)
                    console.error(`Failed to delete output file: ${unlinkErr}`)
            })
        })
    })
}

module.exports = { processImages }
