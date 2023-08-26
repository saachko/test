const fs = require('node:fs');

const COUNT = 1024 * 1024;
const result = [];

for (let i = 0; i < COUNT; i++) {
  result.push(`LOG: element with id ${i}`);
}

fs.writeFileSync('./app/data.json', JSON.stringify(result));
