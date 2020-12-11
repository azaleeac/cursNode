'use strict'

const User = require('../models/users');

module.exports  = {
    isAdmin: isAdmin,
    getUsers: getUsers,
    getUsersById: getUsersById,
    // postUsers: postUsers,
    createUser: createUser,
    deleteUsersById: deleteUsersById,
    responseToJSON: responseToJSON
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
    let filter = {};

    if (req.query && req.query.role) {
        filter["details.role"] = req.query.role;
    }

    User.find(filter, function(err, result) {
        if(err) {
            console.log('err getUsers', err);
            return res.json(err);
        }
        req.resources.users = result;
        return next();
    }); 
}

function getUsersById (req, res, next) {
    User.find({_id: req.params.userId}, function(err, result) {
        if(err) {
            console.log('err getUsersById', err);
            return res.json(err);
        }
        req.resources.users = result;
        return next();
    });    
}

// function postUsers (req, res, next) {
//     console.log('post users first mid');
//     req.resources.test = 'teeest';
//     next();
// }

function createUser(req, res, next) {

    const addUser = req.body;
    // addUser.details = {
    //     age: req.body.age,
    //     role: req.body.role,
    // };

    addUser.details = JSON.parse(req.body.details);
    addUser.documents = JSON.parse(req.body.documents);
    const user = new User(addUser);

    user.save(function (err, result) {
        if(err) {
            console.log('err', err);
            // return res.json(err);
            // next cu eroare -> merg ein middleware de eroare
            err.statusCode = 400;
            return next(err);
        }

        req.resources.newUser = result;
        return next();
    });
}

function deleteUsersById (req, res, next) {
    console.log('deleting one user - controller');
    User.deleteOne({_id: req.body.id}, function(err, result) {
        if(err) {
            console.log('err deleteOne - could not find user', err);
            return res.json(err);
        }
        req.resources.users = result;
        return next();
    });
}

function responseToJSON (prop, statusCode) {
    return function (req, res, next) {
       return res.status(statusCode || 200).json(req.resources[prop]); 
    }
}