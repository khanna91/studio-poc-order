const express = require('express');

const router = express.Router();
const createRoute = require('./create');
const updateStatusRoute = require('./update-status');
const getRoute = require('./get');


router.use('/', createRoute);
router.use('/', updateStatusRoute);
router.use('/', getRoute);


module.exports = router;
