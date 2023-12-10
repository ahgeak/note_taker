const express = require('express');
const path = require('path');
const api = require('./routes/notes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(api);

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req,res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// I am not sure if this is correct, previous activities we did * for 404 but the assignment directions said to use * for index.html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/404.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);