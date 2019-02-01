/**
 * Coupon Service
 *
 */
const { randomNumberGenerator, discountType } = require('@utils/helper');
const { APIError } = require('@utils/APIError');

/**
  * This is a mock function,
  * whose function is to talk to coupon service (micro), verifies the coupon and get details related to that
  *
  * @param {String} couponCode        Coupon Code which user tries to redeem
  */
const getCouponValue = async (couponCode) => {
  if (couponCode !== 'FREETRIAL') {
    throw APIError.withCode('INVALID_COUPON');
  }
  // mock logic to get disount in % or amount
  /* istanbul ignore next */
  let type = discountType.AMOUNT;
  let value = randomNumberGenerator(10, 15);
  const randomType = randomNumberGenerator(1, 10);
  if (randomType > 5) {
    type = discountType.PERCENT;
    value = randomNumberGenerator(2, 5);
  }
  return {
    type,
    value
  };
};

module.exports = {
  getCouponValue
};
