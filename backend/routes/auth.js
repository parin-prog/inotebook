const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const router = express.Router();

// Route 1: Create a user using : POST "/api/auth/createuser". No login required
router.post('/createuser', [body('name').isLength({ min: 5 }),
body('email').isEmail(),
body('password').isLength({ min: 5 })], (req, res) => {

    // If there are errors, return Bad request and the error
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with email already exists
    if (User.findOne({email: req.body.email})) {
        return res.status(400).json('Sorry email with this id exists already');
    }


    // Create a new user
    const user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => { res.send(user) })
        .catch(err => { console.log(err) })

})

module.exports = router;