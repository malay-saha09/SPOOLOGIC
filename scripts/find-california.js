const fs = require('fs');
const h = fs.readFileSync('reference_page.html', 'utf8');
console.log(h.substring(435500, 436100));
