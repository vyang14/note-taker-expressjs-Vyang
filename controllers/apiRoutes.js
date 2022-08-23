const fs = require('fs');
const express = require('express');
const router = express();
const path = require('path');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

router.get('/notes', (req, res) => {
    readFromFile(path.join(__dirname, '../db/db.json')).then((data) => 
        res.status(200).json(JSON.parse(data)))
});

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
            console.log(newNote);
            const dbData = JSON.parse(data);
            dbData.push(newNote);
            console.log(dbData);
            return writeToFile('./db/db.json', dbData);
        }
    });
});

router.delete('/notes/:id', (req, res) => {
    let noteID = req.params.id;
    
    console.log(noteID);

    fs.readFile('./db/db.json', 'utf8', (err, data)=> {
        if (err) {
            console.error(err);
        } else {
        var dbData = JSON.parse(data);
        console.log(dbData);
        dbData = dbData.filter(dbData => dbData.id !== noteID);
        return writeToFile('./db/db.json', dbData);
        }
    });
});

module.exports = router;