const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.toLowerCase().includes('full cart') || content.toLowerCase().includes('view full cart')) {
        console.log('Found in:', full);
      }
    }
  }
}

scanDir(path.join(__dirname, '..', 'src'));
console.log('Scan complete.');
