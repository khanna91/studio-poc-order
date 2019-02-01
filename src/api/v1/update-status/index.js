const express = require('express');
const validate = require('express-validation');
const controller = require('./update-status.controller');
const validator = require('./update-status.validator');

const router = express.Router();

/**
 * @api {put} api/v1/updateStatus updateStatus
 * @apiDescription description
 * @apiVersion 1.0.0
 * @apiName updateStatus
 * @apiPermission public
 *
 * @apiParam  {String} [param]  Put some parameter schema here
 *
 * @apiSuccess {Number} responseCode     HTTP Response Code
 * @apiSuccess {String} responseMessage  Response message
 * @apiSuccess {Object} response         Response object
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/:orderId')
  .patch(validate(validator.joiSchema), controller.updateStatus);

module.exports = router;
