const router = require('express').Router();

// import modular routers once they are created
const notesRouter = require('./notes.js');

// router.use('/name', nameRouter); do this for each router
router.use('/notes', notesRouter);

module.exports = router;