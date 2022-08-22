const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { get } = require('./api');


router.get('/', async (req, res) => {
    readFromFile()
})

router.get('*', )