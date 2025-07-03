const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect(
  'mongodb+srv://mark:MarkMWM@ac-m8ykwqe.klfdnbl.mongodb.net/movie_api?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully!');
});

app.use(morgan('common'));
app.use(bodyParser.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
