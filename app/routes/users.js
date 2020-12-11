'use strict'

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/users',
    usersController.isAdmin,
    usersController.getUsers,
    usersController.responseToJSON('users')
    // function(req, res, next) {
    //     console.log('get users');
    //     return res.json(req.resources.users);
    // }
);

router.get('/usersById/:userId',
    usersController.getUsersById,
    usersController.responseToJSON('users')
);

router.post('/users',
    // usersController.isAdmin,
    // usersController.postUsers,
    usersController.createUser,
    usersController.responseToJSON('newUser')
);

router.put('/users',
    usersController.isAdmin,
    function(req, res, next) {
        console.log('put users');
        return res.json({users: true});
    }
);

router.delete('/users',
    usersController.deleteUsersById,
    usersController.responseToJSON('users')
    // function(req, res, next) {
    //     console.log('delete users');
    //     return res.json({users: true});
    // }
);

module.exports = router;