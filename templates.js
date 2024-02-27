//the folders that will be created when initializing the app.
const folders = ['json', 'app-events.log']

//Add templates that the json files will use here:
const configjson = {

}

//Template for token data recorded in the tokenjson file.
const tokenjson = [{
  created: '2024-02-24 12:00:00',
  username: 'username',
  email: 'user@example.com',
  phone: '7775552222',
  token: 'token',
  expires: '2024-02-26 12:00:00',
  confirmed: 'tbd'
}];

//export each variable or function that will be used throughout the app
module.exports = {
  folders,
  configjson,
  tokenjson,
}