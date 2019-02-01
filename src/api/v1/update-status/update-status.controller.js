const OrderService = require('@services/order');
const { OK } = require('@utils/helper');


/**
 * updateStatus
 * @public
 */
exports.updateStatus = async (req, res, next) => {
  try {
    const order = await OrderService.updateOrderStatus(req.params.orderId, req.body.status);
    return OK(res, 'Order status updated', order);
  } catch (error) {
    return next(error);
  }
};
