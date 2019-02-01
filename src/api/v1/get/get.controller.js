const OrderService = require('@services/order');
const { OK } = require('@utils/helper');

/**
 * get
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const order = await OrderService.get(req.params.orderId);
    return OK(res, 'Order found', order);
  } catch (error) {
    return next(error);
  }
};
