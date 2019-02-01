/* eslint-disable arrow-body-style */
const service = require('./product.service');

describe('Service - product', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should return the prices of products', () => {
    service.getProductPrices(['PR123', 'PR124']).then((prices) => {
      expect(prices).toBeObject();
      expect(prices.PR123).toBeNumber();
      expect(prices.PR124).toBeNumber();
    });
  });
});
