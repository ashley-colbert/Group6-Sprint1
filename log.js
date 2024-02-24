// Inside the CLI script

const fs = require('fs');

function logAction(actionDescription, username) {
    const timeStamp = new Date().toISOString();
    const logEntry = `${timeStamp} - ${actionDescription} by ${username}\n`;

    fs.appendFile('app-events.log', logEntry, 'utf8', err => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

// logAction('User login', 'john_doe');

module.exports = {
    logAction
}