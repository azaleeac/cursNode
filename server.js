'use strict'

const express = require('express');
const app = express();
const config = require ('./config/index');

require('./config/express').initExpress(app);
require('./config/routes').initRoutes(app);

app.listen(config.PORT, function () {
    console.log(`API on port ${config.PORT}`);
})

// const helperCtrl = require('./helper');
// app.use(function (req, res, next) {
//     console.log('general midd');
//     req.test = 'node.js';
//     req.timestamp = helperCtrl.getDate();
//     next();
// });

// app.use('/users', function (req, res, next) {
//     console.log('first midd', req.test);
//     next();
// });

// app.use('/courses', function (req, res, next) {
//     console.log('midd courses', req.test);
//     next();
// });

// app.get('/users', function (req, res, next) {
//     console.log('user route 1');
//     // res.send('hello users');
//     res.json({age: 1, name: 'lala', test: req.test, timestamp: req.timestamp});
// });

// npm init
// npm i --save express
// restart automat
// npm i --save-dev nodemon
// npm i nodemon -g
// nodemon server.js
// NODE_ENV=production nodemon server.js
// npm -i body-parser --save