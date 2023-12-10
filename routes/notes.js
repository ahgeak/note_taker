const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let db = require('../db/db.json')

// GET /api/notes should read the db.json file and return all saved notes as JSON.
notes.get('/api/notes', (req, res) => {
    // fs.readFile('../db/db.json')
    // .then((data) =>
    // res.json(JSON.parse(data))
    // );
    res.json(db)
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
notes.post('/api/notes', (req, res) => {
    // use uuidv4 to make unique ID
    const newNote = req.body;
    newNote.id = uuidv4();
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
notes.delete('/api/notes/:id', (req, res) => {
    // console.log(req.params);
    for (let i = 0; i < db.length; i++){
        if (db[i].id !== req.params.id) {
            db.pop(db[i]);
        }
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

module.exports = notes;