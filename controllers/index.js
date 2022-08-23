const router = require('express').Router();
const apiRoutes  = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');

//sets the html files to / and all api routes to /api
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;