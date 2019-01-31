/**
 * Product Service
 *
 */
const { randomNumberGenerator } = require('@utils/helper');

/**
  * This is a mock function,
  * whose job is to return the unit prices of all the products by talking to product service
  *
  * @param {Array} productsSkus       Product unique identifier
  * @param {String} currency          The currency in which prices required
  */
const getProductPrices = async (productsSkus, currency) => { // eslint-disable-line
  const prices = {};
  productsSkus.forEach((productSku) => {
    prices[productSku] = randomNumberGenerator(40, 100);
  });
  return prices;
};

module.exports = {
  getProductPrices
};
