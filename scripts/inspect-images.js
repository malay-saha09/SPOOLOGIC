const fs = require('fs');
const path = require('path');

const refHtmlPath = path.join(__dirname, '..', 'reference_page.html');
const imagesDir = path.join(__dirname, '..', 'public', 'images');
const html = fs.readFileSync(refHtmlPath, 'utf8');

const base64Regex = /data:image\/(webp|png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)/g;
let match;
let i = 0;
while ((match = base64Regex.exec(html)) !== null) {
  i++;
  const contextBefore = html.substring(Math.max(0, match.index - 120), match.index);
  const contextAfter = html.substring(match.index + match[0].length, Math.min(html.length, match.index + match[0].length + 120));
  console.log(`=== Image #${i} ===`);
  console.log('Before:', contextBefore.replace(/\n/g, ' '));
  console.log('After:', contextAfter.replace(/\n/g, ' '));
}
