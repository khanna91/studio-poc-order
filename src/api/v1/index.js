const express = require('express');

const router = express.Router();
const createRoute = require('./create');


router.use('/order', createRoute);


module.exports = router;
