const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User, userSchema} = require('../models/user');


router.post('/', async (req, res) => {
    const { error } = new Joi.ValidationError(req.body, userSchema);

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User alread exists');

     /**
     * Lodash - It is a popular library that helps to use some utility funcitons in project
     * Instead we can use lodash package to get some specific properties from an object
     */


    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    user = new User(_.pick(req.body, ['name', 'email', 'password'])); // we can see we are not writing req.body again and again for each properties

    // we're encrypting the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

   

    await user.save();

    // sending response without sending the password
    res.send(_.pick(user, ['name', 'email']));

});

module.exports = router;
