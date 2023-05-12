const mongoose = require('mongoose');
const express = require('express');
const app = express();

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies= require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);


mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to the Database...'))
    .catch((error) => console.error(`Couldn't connect to the database...`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));