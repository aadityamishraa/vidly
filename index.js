const mongoose = require('mongoose');
const express = require('express');
const app = express();

const genres = require('./routes/genres');
const customers = require('./routes/customers');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to the Database...'))
    .catch((error) => console.error(`Couldn't connect to the database...`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));