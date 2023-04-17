const express = require('express')
const Note = require('../models/Note')
const {body, validationResult} = require('express-validator')
var fetchuser = require('../middleware/fetchuser')
const router = express.Router();

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    const notes = await Note.find({user: req.user.id});
    res.json(notes)
});

// Route#2 Add a new note using: POST "/api/notes/addnote". require auth
router.post('/addnote', fetchuser, [body('title').isLength({min:5}),
        body('description').isLength({min:5})],
        async (req, res)=>{
            try {
                const {title, description, tags} = req.body;
    
                // If there are errors, return bad request and the errors
                const errors = validationResult(req);
                if(!errors.isEmpty()) {
                    return res.status(400).json({errors : errors.array()});
                }
                
                const note = new Note({
                    title, description, tags, user: req.user.id
                })
    
                const savedData = await note.save()
                res.json(savedData)
                } catch (error) {
                        console.error(error.message)
                        res.status(500).json('Internal Server Error')
                }
        })
module.exports = router;