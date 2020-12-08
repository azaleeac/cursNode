'use strict'

const User = require('../models/users');

module.exports  = {
    isAdmin: isAdmin,
    getUsers: getUsers,
    postUsers: postUsers,
    createUser: createUser
};

function isAdmin (req, res, next) {
    console.log('se face autorizare...');
    const isAdminVal = true;

    if(!isAdminVal) {
        return res.json({err: "Ne pare rau, nu esti autorizat pentru aceasta actiune!"});
    }
    next();
}

function getUsers (req, res, next) {
    console.log('get users first mid');
    next();    
}

function postUsers (req, res, next) {
    console.log('post users first mid');
    req.resources.test = 'teeest';
    next();
}

function createUser(req, res, next) {
    console.log('req body', req.body);
    const user = new User(req.body);

    user.save(function (err, result) {
        if(err) {
            console.log('err', err);
            return res.json(err);
        }

        return res.json(result);
    });
}