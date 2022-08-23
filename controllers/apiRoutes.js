const fs = require('fs');
const express = require('express');
const router = express();
const path = require('path');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// gets all JSON objects from api route api/notes
router.get('/notes', (req, res) => {
    readFromFile(path.join(__dirname, '../db/db.json')).then((data) => 
        res.status(200).json(JSON.parse(data)))
});

// grabs data in the body, generates an ID for it, and then stores it to db.json via posting to api/notes
router.post('/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    }

    fs.readFile('./db/db.json', 'utf8', (err, data)=> {
        if (err) {
            console.error(err);
        } else {
            const dbData = JSON.parse(data);
            dbData.push(newNote);
            return writeToFile('./db/db.json', dbData);
        }
    });
});

// deletes a specific note by filtering through IDs
router.delete('/notes/:id', (req, res) => {
    let noteID = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data)=> {
        if (err) {
            console.error(err);
        } else {
        var dbData = JSON.parse(data);
        dbData = dbData.filter(dbData => dbData.id !== noteID);
        return writeToFile('./db/db.json', dbData);
        }
    });
});

module.exports = router;