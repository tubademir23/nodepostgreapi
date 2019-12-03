require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt());
app.use(errorHandler);
app.use(cors());

app.use('/users', require('./users.controller'));
app.use('/kayit', require('./kayit.controller'));

const port = 2222;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
