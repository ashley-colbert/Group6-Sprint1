
//The basic cli for the gymApp

global.DEBUG = true;

const fs = require("fs");
const {logAction} = require('./log.js');

const myArgs = process.argv.slice(2);

if(DEBUG) if(myArgs.length >= 1) console.log('the gymApp.args: ', myArgs);

switch (myArgs[0]) {
  case 'init':
  case 'i':
      if(DEBUG) console.log(myArgs[0], ' - initialize the app.');
    //   initializeApp(); import once init.js file is complete with a initializeApp() or similar function
      break;
  case 'config':
  case 'c':
      if(DEBUG) console.log(myArgs[0], ' - display the configuration file');
    //   configApp(); import once configApp(or similar) function is complete in config.js
      break;
  case 'token':
  case 't':
      if(DEBUG) console.log(myArgs[0], ' - generate a user token');
    //   tokenApp(); import once token.js file is complete with a tokenApp() function
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