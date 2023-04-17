const express = require('express')
const Note = require('../models/Note')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    const notes = await Note.find({user: req.user.id});
    res.json(notes)
});

module.exports = router;