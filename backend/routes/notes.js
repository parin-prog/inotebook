const express = require('express')
// const Note = require('../models/Note')
const router = express.Router();

// Route 1: Create a note using : POST "/api/notes/createnote". Login required
router.post('/createnote', (req, res) => {
    res.send(req.body);
})

module.exports = router;