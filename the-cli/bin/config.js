const fs = require('fs');

const rawData = fs.readFileSync('config.json', 'utf8');
const config = JSON.parse(rawData);

config.appName = 'My Updated App';

fs.writeFileSync('config.json', JSON.stringify(config, null, 2), 'utf8');
console.log('Config file updated successfully!');