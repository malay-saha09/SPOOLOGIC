const fs = require('fs');
const path = require('path');

const h = fs.readFileSync('reference_page.html', 'utf8');
const imagesDir = path.join(__dirname, '..', 'public', 'images');

const svgRegex = /data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+)/g;
let match;
let count = 0;
while ((match = svgRegex.exec(h)) !== null) {
  count++;
  const decoded = Buffer.from(match[1], 'base64').toString('utf8');
  let filename = `svg-asset-${count}.svg`;
  if (decoded.includes('viewBox') && (decoded.includes('7.35') || decoded.includes('20.369'))) {
    filename = 'california-map.svg';
  } else if (decoded.includes('WARNING') || decoded.includes('path') && count === 2) {
    filename = 'prop65-warning.svg';
  }
  fs.writeFileSync(path.join(imagesDir, filename), decoded);
  console.log(`Saved SVG #${count} as ${filename} (${decoded.length} chars)`);
}
