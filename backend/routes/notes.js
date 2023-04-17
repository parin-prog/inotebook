const express = require('express')
// const Note = require('../models/Note')
const router = express.Router();

router.post('/createnote', (req, res) => {
    res.send(req.body);
})

module.exports = router;