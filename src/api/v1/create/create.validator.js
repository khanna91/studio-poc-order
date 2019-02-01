const Joi = require('joi');

module.exports = {
  name: 'Create New Order',
  path: '/api/v1',
  type: 'post',
  JoiSchema: {
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
          response: {
            id: Joi.string().guid().required(),
            userId: Joi.string().guid().required(),
            currency: Joi.string().required(),
            amount: Joi.number().required(),
            coupon: Joi.string(),
            discount: Joi.object(),
            amountToBePaid: Joi.number().required(),
            meta: Joi.array().items(Joi.object()).required(),
            status: Joi.string().required()
          }
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
