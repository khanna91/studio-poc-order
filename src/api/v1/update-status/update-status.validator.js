const Joi = require('joi');

module.exports = {
  name: 'updateStatus',
  path: '/api/v1/updateStatus',
  type: 'patch',
  joiSchema: {
    params: {
      orderId: Joi.string().guid().required()
    },
    body: {
      status: Joi.string().valid(['CONFIRMED', 'DELIVERED', 'CANCELLED']).required()
    },
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {}
        }
      },
      400: {
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};