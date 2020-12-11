'use strict'

const Service = require('../models/services');

module.exports  = {
    getServices: getServices,
    getServiceById: getServiceById,
    createService: createService,
    deleteServiceById: deleteServiceById,
    responseToJSON: responseToJSON
};

function getServices (req, res, next) {
    // Service.find(function(err, result) {
    //     if(err) {
    //         console.log('err getServices', err);
    //         return res.json(err);
    //     }
    //     req.resources.services = result;
    //     return next();
    // }); 
    Service
        .find()
        .sort({description: -1})
        .populate('user', 'email name documents.name details.age')
        .exec(function(err, result) {
            if(err) {
                console.log('err getServices', err);
                return res.json(err);
            }
            req.resources.services = result;
            return next();
        }); 
}

function getServiceById (req, res, next) {
    //req.params
    //req.query = ce vine dupa "?"
    Service.find({_id: req.params.id}, function(err, result) {
        if(err) {
            console.log('err getServices', err);
            return res.json(err);
        }
        req.resources.services = result;
        return next();
    }); 
}

function createService (req, res, next) {
    const service = new Service(req.body);

    service.save(function (err, result) {
        if(err) {
            console.log('err', err);
            return res.json(err);
        }

        req.resources.newService = result;
        return next();
    });
}

function deleteServiceById (req, res, next) {
    Service.deleteOne({_id: req.body.id}, function(err, result) {
        if(err) {
            console.log('err deleteOne - could not find Service', err);
            return res.json(err);
        }
        req.resources.services = result;
        return next();
    });
}

function responseToJSON (prop) {
    return function (req, res, next) {
       return res.json(req.resources[prop]); 
    }
}