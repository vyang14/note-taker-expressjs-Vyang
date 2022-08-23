const path = require('path');
const express = require('express');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3045;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);