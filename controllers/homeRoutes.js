const path = require('path');
const router = require('express').Router();

// routes the notes.html file to /notes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});


module.exports = router;