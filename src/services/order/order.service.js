/**
 * Order Service
 *
 */
const _ = require('lodash');
const { Order } = require('@models');
const { ORDER_STATUS } = require('@utils/helper');
const { APIError } = require('@utils/APIError');

const create = async (body) => {
  try {
    const params = _.pick(body, ['userId', 'currency', 'amount', 'coupon', 'discount', 'amountToBePaid', 'meta']);
    params.status = ORDER_STATUS.CREATED;
    const order = await Order.create(params);
    return order;
  } catch (err) {
    throw APIError.withCode('ORDER_NOT_CREATED');
  }
};

const get = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw APIError.withCode('ORDER_NOT_FOUND');
  }
  return order;
};

const updateOrderStatus = async (orderId, status) => {
  let order = await get(orderId);
  try {
    order.status = status;
    order = await order.save();
    return order;
  } catch (err) {
    throw APIError.withCode('ORDER_NOT_UPDATED');
  }
};

module.exports = {
  create,
  get,
  updateOrderStatus
};
