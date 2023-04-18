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

// Route#3 Update an existing Note using: PUT "/api/notes/updatenote". require auth
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tags} = req.body;
    // Create a newnote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tags){newNote.tags = tags};

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};

    if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")};

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note})
})

// Route 4: delete an existing Note using: DELETE "/api/notes/deletenote". require auth
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    let note = await Note.findById(req.params.id);

    if(!note){return res.status(404).send("Not Found")};

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success" : "Note has been deleted"})
})

module.exports = router;