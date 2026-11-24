const fs = require('fs');
const path = require('path');

const refHtmlPath = path.join(__dirname, '..', 'reference_page.html');
const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

const html = fs.readFileSync(refHtmlPath, 'utf8');

console.log('HTML size:', html.length);

// 1. Search for base64 webp or png or jpg
const base64Regex = /data:image\/(webp|png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)/g;
let match;
let count = 0;
while ((match = base64Regex.exec(html)) !== null) {
  count++;
  const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
  const data = match[2];
  const buffer = Buffer.from(data, 'base64');
  console.log(`Found base64 image #${count}: ${ext}, size: ${buffer.length} bytes`);
  
  let filename = `asset-${count}.${ext}`;
  if (buffer.length > 50000) {
    filename = `turbo-main.${ext}`;
  } else if (match[0].includes('carrier') || html.substring(Math.max(0, match.index - 50), match.index).includes('carrier')) {
    filename = `carrier-trucks.${ext}`;
  }
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
  console.log(`Saved: ${filename}`);
}

// 2. Search for all image urls (http/https) in the html
const urlRegex = /https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|svg)/gi;
const urls = [...new Set(html.match(urlRegex) || [])];
console.log('Found remote image URLs:', urls.length);
urls.forEach(u => console.log(' -', u));

fs.writeFileSync(path.join(__dirname, 'found-urls.json'), JSON.stringify(urls, null, 2));
