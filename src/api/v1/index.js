const express = require('express');

const router = express.Router();
const createRoute = require('./create');
const updateStatusRoute = require('./update-status');
const getRoute = require('./get');


router.use('/order', createRoute);
router.use('/order', updateStatusRoute);
router.use('/order', getRoute);


module.exports = router;
