const fs = require('fs')
const heicConvert = require('heic-convert')

// Function to convert HEIC to JPG
async function convertHeicToJpg(heicFilePath, jpgFilePath) {
  try {
    const inputBuffer = fs.readFileSync(heicFilePath)
    const outputBuffer = await heicConvert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'JPEG', // output format
      quality: 1, // quality of the output image (0 to 1)
    })

    fs.writeFileSync(jpgFilePath, outputBuffer) // write the JPG file
    console.log(`Converted ${heicFilePath} to ${jpgFilePath}`)
  } catch (error) {
    console.error('Error converting file:', error)
  }
}

// Example usage
const heicFilePath = './public/static/images/uae/burjkhalifa3.HEIC' // replace with your HEIC file path
const jpgFilePath = './public/static/images/uae/burjkhalifa3.jpg' // replace with desired JPG file path
convertHeicToJpg(heicFilePath, jpgFilePath)
