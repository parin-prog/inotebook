const express = require('express')
const User = require('../models/User')
const router = express.Router();

// Route 1: Create a user using : POST "/api/auth/createuser". No login required
router.post('/createuser', (req, res) => {
    const user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => {res.send(user)})
    .catch(err => {console.log(err)})

})

module.exports = router;