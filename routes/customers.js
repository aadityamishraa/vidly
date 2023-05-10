const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
    }
});

const Customer = mongoose.model('Customer', customerSchema);


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
    res.send(ustomer);
});

module.exports = router;