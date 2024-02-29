// running the server on a local port

const { newToken } = require('./tokens.js')
// const crc32 = require('crc/crc32');
const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (request, response) => {
    response.status(200).render('form', )
});

//will send username information to the newToken function in the tokens.js file to create a new token for a new user, the new ueser information is then written to the tokens.json file.
app.post('/createUser', async (request, response) => {
    const username = request.body.username;
    try {
      const token = await newToken(username);
      response.status(200).send(`User created with token: ${token}`);
    } catch (error) {
      console.error(error);
      response.status(500).send('An error occurred');
    }
  });

app.listen(3000);
