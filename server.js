const path = require('path');
const express = require('express');
const fs = require('fs');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);