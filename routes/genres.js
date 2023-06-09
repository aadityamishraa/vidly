const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {Genre} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', auth, async (req, res) => {
    const { error } = new Joi.ValidationError(req.body, genreSchema);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });

    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {

    const { error } = new Joi.ValidationError(req.body, genreSchema);
    if (error) return res.send(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { new: true });

    if (!genre) return res.status(400).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.delete('/:id', [auth, admin],async (req, res) => {
    const genre = await Genre.FindByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found');
    res.send(genre);
});

router.get('/:id', async (req, res) => {
   const genre = await Genre.FindById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});


// function validateGenre(genre) {
//     const schema = {
//         name: Joi.string().min(3).required
//     };

//     return Joi.validate(genre, schema);
// }

module.exports = router;