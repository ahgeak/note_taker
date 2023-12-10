const notes = require('express').Router();
// fs is requiring file systems
const fs = require('fs');

// uuid will create a unique ID for items on list
const { v4: uuidv4 } = require('uuid');

// db is the database json file that will store the notes
let db = require('../db/db.json')

// GET /api/notes reads the db.json file and returns all saved notes as JSON
notes.get('/api/notes', (req, res) => {
    res.json(db)
});

// POST /api/notes receives a new note to save on the request body, add it to the db.json file, and then return the new note to the client. It uses uuidv4 to give each note a unique id when it's saved
notes.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

// DELETE /api/notes/:id receives a query parameter containing the id of a note to delete. 
notes.delete('/api/notes/:id', (req, res) => {
    for (let i = 0; i < db.length; i++){
        if (db[i].id !== req.params.id) {
            db.pop(db[i]);
        }
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

module.exports = notes;