/**
 * Order Service
 *
 */
const _ = require('lodash');
const { Order } = require('@models');
const { ORDER_STATUS } = require('@utils/helper');
const { APIError } = require('@utils/APIError');

const createOrder = async (body) => {
  try {
    const params = _.pick(body, ['userId', 'currency', 'amount', 'coupon', 'discount', 'amountToBePaid', 'meta']);
    params.status = ORDER_STATUS.CREATED;
    const order = await Order.create(params);
    return order.toJSON();
  } catch (err) {
    throw APIError.withCode('ORDER_NOT_CREATED');
  }
};

const getOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw APIError.withCode('ORDER_NOT_FOUND');
  }
  return order.toJSON();
};

const updateOrderStatus = async (orderId, status) => {
  let order = await getOrder(orderId);
  order.status = status;
  order = await order.save();
  return order.toJSON();
};

module.exports = {
  createOrder,
  getOrder,
  updateOrderStatus
};
