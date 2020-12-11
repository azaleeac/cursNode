'use strict'

const bodyParser = require('body-parser');

module.exports = {
    initExpress: initExpress
};

function initExpress(app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    
    //parse application/json
    app.use(bodyParser.json());

    app.use(function(req, res, next){
        req.resources = req.resources || {};
        // asa s-ar pune sa ai resursa pe orice request
        // res.locals.isLoggedIn = !!req.user;
        next();
    });
}



