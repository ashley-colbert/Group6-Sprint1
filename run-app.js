// running the server on a local port

const { newToken } = require('./tokens.js')

const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (request, response) => {
    response.status(200).render('form', )
});

app.post('/createuser', async (request, response) => {
    const username = request.body.username;
    try{
         const token = await newToken(username);
         response.status(200).send(`User created with token: ${token}`);
     }
     catch{error}
 });

app.listen(3000);
