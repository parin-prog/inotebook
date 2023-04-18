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
    try {
    // Check whether the user with email already exists
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).json('Sorry email with this id exists already');
    }

    // Password encryption for security
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    // .then(user => { res.send(user) })
    // .catch(err => { console.log(err) })

    // Adding JWT token for authentication purpose
    const data = {
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken});
        } catch (error){
            console.error(err.message);
            res.status(500).send('Some error occured');
        }
})

// Route 2: Authenticate user using: POST "/api/auth/login". No login required
router.post('/login', [body('email').isEmail({min:5},
            body('password').exists(),
            )], async (req, res) => {
                // If there are errors, return Bad request and the errors.
                const errors = validationResult(req);
                if(!errors.isEmpty()) {
                    return res.status(400).json({errors: errors.array()})
                }

                const {email, password} = req.body;
                try {
                // find data from db by email
                let user = await User.findOne({email});
                if(!user) {
                    return res.status(400).json({error: 'Please try to login with correct credentials'})
                }
                // decode the password & match with correct password
                const passwordCompare = await bcrypt.compare(password, user.password);
                if(!passwordCompare) {
                    return res.status(400).json({error: 'Please try to login with correct password'})
                }

                // JWT token for authentication
                const data = {
                    user: {
                      id: user.id
                    }
                  }
                  const authtoken = jwt.sign(data ,JWT_SECRET);
                  res.json(authtoken);
                } catch(error){
                    console.log(error.message);
                    res.status(500).send('Internal Server Error');
                  }
})

// Route#3 Get logged in user details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res)=>{
            try {
                const userId = req.user.id;
                let user = await User.findById(userId).select('-password');
                res.send(user)
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
              }
})

module.exports = router;