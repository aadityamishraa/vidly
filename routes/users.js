const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {User, userSchema} = require('../models/user');


router.post('/', async (req, res) => {
    const { error } = new Joi.ValidationError(req.body, userSchema);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User alread exists');

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });


    /**
     * Lodash - It is a popular library that helps to use some utilities funciton in project
     * Instead we can use lodash package to get some specific properties from an object
     */

    
    await user.save();

    res.send(user);

});

module.exports = router;