
// This is a utility script to create icon files for the extension
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

// Get the directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to create a simple PNG icon
function createPngIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw circle background
  ctx.fillStyle = '#10b981'; // EcoAware green
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
  ctx.fill();
  
  // Draw text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size/3}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('EA', size/2, size/2);
  
  return canvas.toBuffer('image/png');
}

export async function createIcons() {
  // Create the dist directory if it doesn't exist
  const distDir = path.resolve(__dirname, '../../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Create icons of different sizes
  const sizes = [16, 48, 128];
  sizes.forEach(size => {
    const pngBuffer = createPngIcon(size);
    fs.writeFileSync(path.join(distDir, `icon${size}.png`), pngBuffer);
    console.log(`Created icon${size}.png`);
  });

  // Copy manifest.json to dist folder
  const manifestSource = path.resolve(__dirname, '../../public/manifest.json');
  const manifestDest = path.resolve(distDir, 'manifest.json');
  fs.copyFileSync(manifestSource, manifestDest);
  console.log('Copied manifest.json to dist folder');

  console.log('Icon files created successfully!');
}

// Allow direct execution
if (import.meta.url === `file://${fileURLToPath(import.meta.url)}`) {
  createIcons();
}
