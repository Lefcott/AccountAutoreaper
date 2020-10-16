const fs = require('fs');

const image = fs.readFileSync(`${__dirname}/src/utils/textDetection/temp_level.png`).toString('base64');
fs.writeFileSync(`${__dirname}/image.txt`, image);
