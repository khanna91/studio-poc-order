const _ = require('lodash');
const ProductService = require('@services/product');
const CouponService = require('@services/coupon');
const { formulateOrder, OK } = require('@utils/helper');

/**
 * create
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const body = _.pick(req.body, ['userId', 'orderItems', 'currency', 'coupon']);
    const skus = body.orderItems.map(product => product.sku);
    const promises = [];
    promises.push(ProductService.getProductPrices(skus));
    if (!_.isNil(body.coupon)) {
      promises.push(CouponService.getCouponValue(body.coupon));
    }
    const result = await Promise.all(promises);
    const order = formulateOrder(body, result);
    return OK(res, 'Order Created', order);
  } catch (error) {
    return next(error);
  }
};
