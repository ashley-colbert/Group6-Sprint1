//npm imports used in this page
const fs = require ('fs');
const path = require('path');
const crc32 = require('crc/crc32');
const { format, isPast, parseISO } = require('date-fns');

// slice off the first 2 arguments when return results if a request is made using the CLI
const myArgs = process.argv.slice(2);

//function to count how many tokens are in the tokens.json file.
function tokenCount() {
  if(DEBUG) console.log('token.tokenCount()');
  
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
    if(error) throw error;
    try {
      let tokens = JSON.parse(data);
      const count = tokens.length;
      console.log(`There are ${count} tokens in total`);
    } catch (err) {
      console.log('Error returning token count', err);
    }
  });
}

//function to add a new user to the tokens.json file
function newToken(username) {
  if(DEBUG) console.log('token.newToken()');
  let newToken = JSON.parse (`{
      "created": "1969-01-31 12:30:00",\n
      "username": "username",\n
      "email": "user@example.com",\n
      "phone": "5556597890",\n
      "token": "token",\n
      "expires": "1969-02-03 12:30:00",\n
      "confirmed": "tbd"\n
  }`);
  //the token created will expire after 2 days
  let now = new Date();
  let expires = addDays(now, 2);

  newToken.created = `${format(now, 'yyyy-MM-dd HH:mm:ss')}`;
  newToken.username = username;
  newToken.token = crc32(username).toString(16);
  newToken.expires = `${format(expires, 'yyyy-MM-dd HH:mm:ss')}`;
  fs.readFile(__dirname + '/json/tokens.json', 'utf-8', (error, data) => {
    if(error) throw error;
    let tokens = JSON.parse(data);
    tokens.push(newToken);
    userTokens = JSON.stringify(tokens);

    fs.writeFile(__dirname + '/json/tokens.json', userTokens, (err) => {
        if (err) console.log(err);
        else {
            console.log(`New token ${newToken.token} was created for ${username}.`);
        }
    })
    
});
return newToken.token;
}

//the function to add days to the a date, used to determine how long it will take before a token expires.
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

//function to set the phone number in a particular entry in the tokens.json file.
const tokensFilePath = path.join(__dirname, 'json', 'tokens.json');//to define the path to be used in multiple functions.

//This function will set a users phone number in the tokens.json file by searching for their username.
function setPhone(username, newPhone) {
//will read the tokens.json file
  fs.readFile(tokensFilePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Error reading the tokens file:', error);
      return;
    }
//will parse the data from the json file into an array to find the username.
    let tokens = JSON.parse(data);
    const tokenIndex = tokens.findIndex(token => token.username === username);

    if (tokenIndex === -1) {
      console.log(`No token found for username: ${username}`);
      return;
    }
//this will change existing phone number into the new phone number that is entered into the command line
    tokens[tokenIndex].phone = newPhone;
//the data for the new phone number will now be written back into the tokens.json file.
    fs.writeFile(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf-8', (writeError) => {
      if (writeError) {
        console.error('Error writing the updated tokens to the file:', writeError);
      } else {
        //Confirmation of the updated phone number will be logged to the console.
        console.log(`Phone number for username '${username}' updated to '${newPhone}'.`);
      }
    });
  });
}

//This function operates similar to the previous but it will updated a users email address and save the new address into the tokens.js file.
function setEmail(username, newEmail) {

  fs.readFile(tokensFilePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Error reading the tokens file:', error);
      return;
    }

    let tokens = JSON.parse(data);
    const tokenIndex = tokens.findIndex(token => token.username === username);

    if (tokenIndex === -1) {
      console.log(`No token found for username: ${username}`);
      return;
    }

    tokens[tokenIndex].email = newEmail;

    fs.writeFile(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf-8', (writeError) => {
      if (writeError) {
        console.error('Error writing the updated tokens to the file:', writeError);
      } else {
        console.log(`Phone number for username '${username}' updated to '${newEmail}'.`);
      }
    });
  });
}

//This function will search for a username and return the token, if the token is expired it will create a new token, record it to the tokens.json file, and return the new token.
function searchUser(username) {
  //will read the tokens.json file
  fs.readFile(tokensFilePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Error reading the token file:', error);
      return;
    }
    //will parse the json data into a javascript array and find the username
    try {
      let token = JSON.parse(data);
      let tokenEntry = token.find( token => token.username === username);
      let now = new Date();

      if(!tokenEntry) {
        console.log(`No token found for ${username}`)
        return;
      }
 //if the token is expired it will create a new token with will expire in 2 days.
        if( isPast(parseISO(tokenEntry.expires))) {
          console.log("Token has expired");
          let newTokenVal = crc32(username).toString(16);
          let expires = addDays(now, 2);
//if a new token was created it will now be known as newTokenVal for the purposes of this function
          tokenEntry.token = newTokenVal;
          tokenEntry.created = format(now, 'yyyy-MM-dd HH:mm:ss');
          tokenEntry.expires = format(expires, 'yyyy-MM-dd HH:mm:ss');
//the new token value, date created and expiry date will not be written to the file tokens.json
          fs.writeFile(tokensFilePath, JSON.stringify(token, null, 2), 'utf-8', (writeError) => {
            if (writeError) {
              console.log("Error")
            } else{
              //if a new token was create the new value will me logged to the console
              console.log(`New token: ${newTokenVal} created and saved for: ${username}`)
            }
          });
          } else {
            //if the token was already valid the existing value will be logged to the console.
            console.log(`Token: ${tokenEntry.token} is valid for ${username}`);
          console.log("");
        }
    } catch (err) {
      console.log("Error", err)
    }
  })
}

//This function will preform similar steps as the previous function, but will search based on a users email address.
function searchEmail(email) {
  fs.readFile(tokensFilePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Error reading the token file:', error);
      return;
    }

    try {
      let token = JSON.parse(data);
      let tokenEntry = token.find( token => token.email === email);
      let now = new Date();

      if(!tokenEntry) {
        console.log(`No token found for user with email: ${email}`)
        return;
      }

        if( isPast(parseISO(tokenEntry.expires))) {
          console.log("Token has expired");
          let newTokenVal = crc32(email).toString(16);
          let expires = addDays(now, 2);

          tokenEntry.token = newTokenVal;
          tokenEntry.created = format(now, 'yyyy-MM-dd HH:mm:ss');
          tokenEntry.expires = format(expires, 'yyyy-MM-dd HH:mm:ss');

          fs.writeFile(tokensFilePath, JSON.stringify(token, null, 2), 'utf-8', (writeError) => {
            if (writeError) {
              console.log("Error")
            } else{
              console.log(`New token: ${newTokenVal} created and saved for user with email: ${email}`)
            }
          });
          } else {
            console.log(`Token: ${tokenEntry.token} is valid for user with email:${email}`);
          console.log("");
        }
    } catch (err) {
      console.log("Error", err)
    }
  })
}

//This function will preform similar steps to the previous function but will search using a users phone number.
function searchPhone(phone) {
  fs.readFile(tokensFilePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Error reading the token file:', error);
      return;
    }

    try {
      let token = JSON.parse(data);
      let tokenEntry = token.find( token => token.phone === phone);
      let now = new Date();

      if(!tokenEntry) {
        console.log(`No token found for user with email: ${phone}`)
        return;
      }

        if( isPast(parseISO(tokenEntry.expires))) {
          console.log("Token has expired");
          let newTokenVal = crc32(phone).toString(16);
          let expires = addDays(now, 2);

          tokenEntry.token = newTokenVal;
          tokenEntry.created = format(now, 'yyyy-MM-dd HH:mm:ss');
          tokenEntry.expires = format(expires, 'yyyy-MM-dd HH:mm:ss');

          fs.writeFile(tokensFilePath, JSON.stringify(token, null, 2), 'utf-8', (writeError) => {
            if (writeError) {
              console.log("Error")
            } else{
              console.log(`New token: ${newTokenVal} created and saved for user with phone number: ${phone}`)
            }
          });
          } else {
            console.log(`Token: ${tokenEntry.token} is valid for user with phone number:${phone}`);
          console.log("");
        }
    } catch (err) {
      console.log("Error", err)
    }
  })
}

function tokenApp() {
  console.log(myArgs);
  if(DEBUG) console.log('tokenApp()');
  switch(myArgs[1]) {
  case '--count':
    if(DEBUG) console.log('--count');
    tokenCount();
    break;
  case '--new':
    if (myArgs.length < 3) {
      console.log('invalid syntax. node myapp token --new [username]')
  } else {
    if(DEBUG) console.log('--new');
    newToken(myArgs[2]);
  }
    break;

  case '--upd':
    if(myArgs[2] === 'p' && myArgs.length === 5) {
      const username = myArgs[3];
      const newPhone = myArgs[4];
      setPhone(username, newPhone);
    } else if (myArgs[2] === 'e' && myArgs.length === 5) {
        const username = myArgs[3];
        const newEmail = myArgs[4];
        setEmail(username, newEmail);
      
    } else {
      console.log("invalid syntax")
    }
    break;

  case '--search':
    if(myArgs[2] === 'u' && myArgs.length === 4) {
      const username = myArgs[3]
      searchUser(username);
    } else if (myArgs[2] === 'e' && myArgs.length === 4) {
        const email = myArgs[3]
        searchEmail(email);
    } else if (myArgs[2] === 'p' && myArgs.length === 4) {
      const phone = myArgs[3]
      searchPhone(phone);
    } else {
      console.log("invalid syntax")
    }
    break;
  case '--help':
  case '--h':
  default:
    fs.readFile(__dirname + "/cliUsage.txt", (error, data) => {
      if(error) throw error;
      console.log(data.toString());
    });
  }
}
module.exports = {
  tokenApp,
}

