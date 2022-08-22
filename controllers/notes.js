const { json } = require('express');
const express = require('express');
const { fstat } = require('fs');
const router = express.router();
const path = require('path');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid');

router.get('/', (req, res) => {
    readFromFile(path.join(__dirname, '../db/db.json')).then((data) => res.status(200).json(JSON.parse(data)))
});

router.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
    }

    fs.readFile('../db/db.json', 'utf8', (err, data)=> {
        if (err) {
            console.error(err);
        }else{
        const dbData = JSON.parse(data);
        dbData.push(newNote);
        writeToFile('./db/db.json', JSON.stringify(dbData));
        }
    })

    
});

router.get('/api/notes', (req, res) => {

});

router.delete('/api/notes/:id', (req, res) => {
    let noteID = req.params.id;
    console.log(noteID);

});

module.exports = router;