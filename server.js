'use strict'

const express = require('express');
const app = express();
const config = require ('./config/index');

require('./config/mongoose').initMongoose();
require('./config/express').initExpress(app);
require('./config/security').initHelmet(app);
require('./config/routes').initRoutes(app);

// pt ca e importanta ordinea
// obligatoriu dupa rute, altfel intra in el orice request
app.all("*", function (req, res, next) {
    console.log("final router - does not exist");
    return res.status(404).json({
        status: 'fail',
        message: `Can't find route ${req.url}`
    });
})

app.use(function(err, req, res, next) {
    console.log('middleware de eroare');
    // return res.json(err);
    return res.status(err.statusCode || 400).json({
        status: 'error',
        message: err && err.message || 'default message'
    });
});

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
// npm i body-parser --save
// https://github.com/github/gitignore/blob/master/Node.gitignore
// npm i helmet --save

// pt transpile
// npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
// https://medium.com/@abs4real16.ma/writing-es6-in-nodejs-using-babel-10731b8032fc

// npm install --save multer


