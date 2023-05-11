const express = require('express');
const router = express.Router();

const { Movie, movieSchema } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', (req, res) => {
    const movies = Movie.find().sort('name');
    res.send(movies);
});

router.post('/', async (req, res) =>{
    const { error } = new Joi.ValidationError(req.body, movieSchema);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!movie ) return res.status(400).send('Invalid request');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    movie = await Movie.save();

    res.send(movie);
});

router.put('/:id', async (req, res) =>{
    const {error} = new Joi.ValidationError(req.body, movieSchema);

    if(error) return res.send(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);

    if(!genre) return res.send(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre:{
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    }, {new: true});

    if(!movie) return res.send(404).send('The Movie with the given ID was not found.');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });
  
  router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
  });
  
  module.exports = router; 