import fs from 'fs';
import path from 'path';

// Function to get image paths from a directory
export const getImagePaths = (dir: string): { src: string; alt: string }[] => {
  const images: { src: string; alt: string }[] = [];
  
  // Read the directory
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Check if the file is an image
    if (stat.isFile() && /\.(jpg|jpeg|png|gif|bmp|svg)$/.test(file)) {
      images.push({
        // Remove 'public/' from the file path
        src: filePath.replace(/^public\//, ''), 
        alt: path.basename(file, path.extname(file)), // Use the file name as alt text
      });
    }
  });

  return images;
};

// Example usage
const imagePaths = getImagePaths('./path/to/your/images');
console.log(imagePaths); 