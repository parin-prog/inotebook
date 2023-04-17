const express = require('express')
// const User = require('../models/User')
const router = express.Router();

router.post('/createuser', (req, res) => {
    res.send(req.body);
})

module.exports = router;