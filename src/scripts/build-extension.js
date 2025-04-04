
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { createIcons } from '../utils/createIcons.js';

console.log('Building extension...');

// Run Vite build
try {
  console.log('Running Vite build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Run icon creation script
  console.log('Creating extension icons...');
  await createIcons();
  
  console.log('Extension build completed successfully!');
  console.log('\nTo load the extension in Chrome:');
  console.log('1. Open Chrome and go to chrome://extensions/');
  console.log('2. Enable "Developer mode"');
  console.log('3. Click "Load unpacked" and select the dist folder');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
