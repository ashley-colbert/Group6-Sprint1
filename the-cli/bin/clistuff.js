global.DEBUG = true;

const fs = require("fs");

const { readWrite } = require('./a-cli-file.js');
const { updateAlter } = require('./config.js');
const { newUser } = require('./user-authentication.js');
const { logActions } = require('./log.js');

const theArgs = process.argv.slice(3);

if(DEBUG) if(theArgs.length >= 1) console.log("the cliStuff.args: ", theArgs);

switch (theArgs[0]) {
    case 'a-cli-file':
    case 'a':
        if(DEBUG) console.log(theArgs[0], ' - read and write json and text files.');
        readWrite();
        break;
    case 'update':
    case 'u':
        if(DEBUG) console.log(theArgs[0], ' - display the configuration file.');
        updateAlter();
        break;
    case 'new':
    case 'n':
        if(DEBUG) console.log(theArgs[0], ' - generate a new user.');
        newUser();
        break;
    case 'log':
    case 'l':
        if(DEBUG) console.log(theArgs[0], ' - store new user authentication.');
        logActions();
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/options.txt", (error, data) => {
            if(error) throw error;
            console.log(data.toString());
        });
}
