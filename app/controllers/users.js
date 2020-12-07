'use strict'

module.exports  = {
    isAdmin: isAdmin,
    getUsers: getUsers,
    postUsers: postUsers
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