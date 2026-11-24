const fs = require('fs');
const path = require('path');
const https = require('https');

const refHtmlPath = path.join(__dirname, '..', 'reference_page.html');
const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');
const accDir = path.join(imagesDir, 'accessories');

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(accDir)) fs.mkdirSync(accDir, { recursive: true });

const html = fs.readFileSync(refHtmlPath, 'utf8');

const base64Regex = /data:image\/(webp|png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)/g;
let match;
let count = 0;
const names = [
  'carrier-trucks.webp',
  'turbo-main.webp',
  'turbo-thumb-1.webp',
  'turbo-thumb-2.webp',
  'turbo-thumb-3.webp',
  'turbo-thumb-4.webp'
];

while ((match = base64Regex.exec(html)) !== null) {
  count++;
  const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
  const buffer = Buffer.from(match[2], 'base64');
  const filename = names[count - 1] || `image-${count}.${ext}`;
  fs.writeFileSync(path.join(imagesDir, filename), buffer);
  console.log(`Saved ${filename}: ${buffer.length} bytes`);
}

// Check remote accessory download
const accessoryUrls = [
  { id: 'acc-1', file: 'boot-inlet.jpg', url: 'https://admin.spoologic.com/wp-content/uploads/2026/07/TP38-Compressor-Inlet-Boot-For-94-97-7.3L-Ford-Powerstroke-Diesel.jpg' },
  { id: 'acc-2', file: 'vband-clamp.jpg', url: 'https://admin.spoologic.com/wp-content/uploads/2026/07/SL-330-001-scaled-1.jpg' },
  { id: 'acc-3', file: 'plenum-boots.jpg', url: 'https://admin.spoologic.com/wp-content/uploads/2026/07/SPOOLOGIC-Spider-to-Intake-Plenum-Boots-SL-420-001-scaled-1.jpg' },
  { id: 'acc-4', file: 'uppipe-kit.jpg', url: 'https://admin.spoologic.com/wp-content/uploads/2026/07/Spoologic-SL-510-001-Bellowed-Up-Pipe-Kit-–-1994–1997-OBS-7.3L-Powerstroke-scaled.jpg' },
  { id: 'acc-5', file: 'manifold-kit.jpg', url: 'https://admin.spoologic.com/wp-content/uploads/2026/07/SPOOLOGIC-Exhaust-Manifold-Kit-SL-500-001-7.3L-Powerstroke-scaled-1.jpg' },
  { id: 'acc-6', file: 'map-sensor.jpg', url: 'https://admin.spoologic.com/wp-content/uploads/2026/07/SPOOLOGIC-Manifold-Absolute-Pressure-MAP-Sensor-SL-600-010-scaled.jpg' },
  { id: 'acc-7', file: 'pedestal.jpg', url: 'https://admin.spoologic.com/wp-content/uploads/2026/07/SPOOLOGIC-Turbo-Pedestal-With-EBPV-SL-340-001.jpg' },
  { id: 'acc-8', file: 'outlet-plate.jpg', url: 'https://admin.spoologic.com/wp-content/uploads/2026/07/SPOOLOGIC-Turbo-Outlet-Plate-EBPV-SL-370-001-scaled-1.jpg' }
];

function downloadUrl(item) {
  return new Promise((resolve) => {
    const dest = path.join(accDir, item.file);
    try {
      const parsedUrl = new URL(encodeURI(item.url));
      const req = https.get(parsedUrl, { timeout: 6000 }, (res) => {
        if (res.statusCode === 200) {
          const fileStream = fs.createWriteStream(dest);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded ${item.file}`);
            resolve(true);
          });
        } else {
          console.log(`Failed ${item.file}: Status ${res.statusCode}`);
          resolve(false);
        }
      });
      req.on('error', (err) => {
        console.log(`Error downloading ${item.file}: ${err.message}`);
        resolve(false);
      });
      req.on('timeout', () => {
        req.destroy();
        console.log(`Timeout downloading ${item.file}`);
        resolve(false);
      });
    } catch (e) {
      console.log(`Exception for ${item.file}: ${e.message}`);
      resolve(false);
    }
  });
}

(async () => {
  for (const item of accessoryUrls) {
    await downloadUrl(item);
  }
  console.log('Done processing assets.');
})();
