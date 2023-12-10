const express = require('express');
const path = require('path');
const api = require('./routes/notes');

// ports for the program
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(api);

// app.get "/" is sending the index.html file to the client
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
);

// app.get "/notes" is sending the notes.html to the client
app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// app.get "*" is sending the 404.html file to the client
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html'))
);

// listening for the port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);