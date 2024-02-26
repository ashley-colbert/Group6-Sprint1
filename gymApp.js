
//The basic cli for the gymApp

global.DEBUG = true;

const fs = require("fs");
const {logAction} = require('./log.js');
const {initializeApp} = require('./init.js');
const {newUser} = require('./user-authentication.js');
const {readWrite} = require('./a-cli-file.js');
const { updateAlter } = require('./config.js');

const myArgs = process.argv.slice(2);

if(DEBUG) if(myArgs.length >= 1) console.log('the gymApp.args: ', myArgs);

switch (myArgs[0]) {
  case 'init':
  case 'i':
      if(DEBUG) console.log(myArgs[0], ' - initialize the app.');
      //Function imported from init.js file to create necessary files and folders.
      initializeApp();
      break;
  case 'a-cli-file':
  case 'a':
      if(DEBUG) console.log(theArgs[0], ' - read and write json and text files.');
      readWrite();
      break;
  case 'u':
      if(DEBUG) console.log(theArgs[0], ' - display the configuration file.');
      updateAlter();
      break;
  case 'n':
      if(DEBUG) console.log(theArgs[0], ' - generate a new user.');
      newUser();
      break;
  case 'token':
  case 't':
      if(DEBUG) console.log(myArgs[0], ' - generate a user token');
    //   tokenApp(); import once token.js file is complete with a tokenApp() function
      break;
  case 'l':
      if(DEBUG) console.log(theArgs[0], ' - store new user authentication.');
      logActions();
      break;
  case '--help':
  case '--h':
  default:
    //the contents of cliUsage.txt file will appear to help guide users while using the app.
      fs.readFile(__dirname + "/cliUsage.txt", (error, data) => {
          if(error) throw error
          //logs action to file app-events/log using imported logAction() function from log.js file
          logAction("Help information accessed on CLI", null);
          console.log(data.toString());
      });
}