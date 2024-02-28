// Inside the CLI script

const fs = require('fs');
const path = require('path');

function logAction(actionDescription, username) {
    const timeStamp = new Date().toISOString();
    const logEntry = `${timeStamp} - ${actionDescription}\n`;

    fs.appendFile(path.join(__dirname, '/log/app-events.log'), logEntry, 'utf8', err => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}
function logError(actionDescription) {
    const timeStamp = new Date().toISOString();
    const logEntry = `${timeStamp} - ${actionDescription}\n`;

    fs.appendFile(path.join(__dirname, '/log/error-events.log'), logEntry, 'utf8', err => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

module.exports = {
    logAction,
    logError
}