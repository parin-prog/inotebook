const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const JWT_SECRET = 'mysecrettoken';

// Route 1: Create a user using : POST "/api/auth/createuser". No login required
router.post('/createuser', [body('name').isLength({ min: 5 }),
body('email').isEmail(),
body('password').isLength({ min: 5 })], async(req, res) => {

    // If there are errors, return Bad request and the error
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with email already exists
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).json('Sorry email with this id exists already');
    }

    // Password encryption for security
    const salt = bcrypt.genSalt(10);
    const secPass = bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    }).then(user => { res.send(user) })
        .catch(err => { console.log(err) })

    // Adding JWT token for authentication purpose
    const data = {
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json(authtoken);

})

module.exports = router;