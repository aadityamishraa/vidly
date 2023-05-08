const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id:1, name: 'Action'},
    {id:2, name: 'Horror'},
    {id:3, name: 'Romance'},
]

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length +1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.put('/:id', (req, res) => {
    const genre = genres.find(c=> c.id===parseInt(req.params.id));
    if(!genre) return res.status(400).send('The genre with the given ID was not found.');

    const { error } = validateGenre(req.body);
    if(error) return res.send(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});