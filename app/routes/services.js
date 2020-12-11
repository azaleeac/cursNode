'use strict'

const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services');

router.get('/services',
    servicesController.getServices,
    servicesController.responseToJSON('services')
);

router.get('/serviceById/:id',
    servicesController.getServiceById,
    servicesController.responseToJSON('services')
);

router.post('/services',
    servicesController.createService,
    servicesController.responseToJSON('newService')
);

router.delete('/services',
    servicesController.deleteServiceById,
    servicesController.responseToJSON('services')
);

module.exports = router;