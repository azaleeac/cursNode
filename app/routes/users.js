'use strict'

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/users',
    usersController.isAdmin,
    usersController.getUsers,
    function(req, res, next) {
        console.log('get users seconds mid');
        next();
    },
    function(req, res, next) {
        console.log('get users');
        return res.json({users: true});
    }
);

router.post('/users',
    usersController.isAdmin,
    usersController.postUsers,
    usersController.createUser,
    function(req, res, next) {
        console.log('post users');
        console.log(req.body);
        console.log('resources', req.resources);
        return res.json({users: true});
    }
);

router.put('/users',
    usersController.isAdmin,
    function(req, res, next) {
        console.log('put users');
        return res.json({users: true});
    }
);

router.delete('/users',
    usersController.isAdmin,
    function(req, res, next) {
        console.log('delete users');
        return res.json({users: true});
    }
);

module.exports = router;