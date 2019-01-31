const Joi = require('joi');

module.exports = {
  name: 'create',
  path: '/api/v1/create',
  type: 'post',
  joiSchema: {
    body: {
      userId: Joi.string().guid().required(),
      currency: Joi.string().required(),
      coupon: Joi.string(),
      orderItems: Joi.array().items(Joi.object({
        sku: Joi.string().required(),
        quantity: Joi.number().required()
      })).required()
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
