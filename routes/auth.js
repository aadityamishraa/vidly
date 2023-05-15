const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User} = require('../models/user');


router.post('/', async (req, res) => {
    const { error } = new Joi.ValidationError(req.body, userSchema);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('Incorrect email or password');

    const validPassword = await bcrypt.compare(req.body.password, User.password);
    if(!validPassword) return res.status(400).send('Incorrect email or password');

    res.send(true);
});

module.exports = router;
