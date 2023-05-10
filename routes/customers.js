const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const {Customer} = require('../models/customer');

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = new Joi.ValidationError(req.body, Customers);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone, 
    });

    customer = await Customer.save();
    res.send(customer);
});

module.exports = router;