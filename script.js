const fs = require('fs')
const heicConvert = require('heic-convert')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')

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
// const heicFilePath = './public/static/images/malaysia/IMG_9975.HEIC' // replace with your HEIC file path
// const jpgFilePath = './public/static/images/malaysia/IMG_9975.jpg' // replace with desired JPG file path
// convertHeicToJpg(heicFilePath, jpgFilePath)

// Function to get image paths from a directory
const getImagePaths = (dir) => {
  const images = []

  // Read the directory
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    // Check if the file is an image
    if (stat.isFile() && /\.(jpg|jpeg|png|gif|bmp|svg)$/.test(file)) {
      images.push({
        src: filePath.replace(/^public/, ''),
        alt: path.basename(file, path.extname(file)), // Use the file name as alt text
      })
    }
  })

  return images
}

// Example usage
const imagePaths = getImagePaths('./public/static/images/malaysia')
console.log(imagePaths)
