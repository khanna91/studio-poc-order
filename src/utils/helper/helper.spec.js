/* eslint-disable arrow-body-style */
const util = require('./helper.util');

describe('Utility - helper', () => {
  let body;
  let result;
  beforeEach(() => {
    body = {
      userId: '04976e84-06dc-4652-a066-efea38a992e0',
      currency: 'USD',
      orderItems: [
        { sku: 'PR12', quantity: 2 },
        { sku: 'PR13', quantity: 1 }
      ]
    };
    result = [
      { PR12: 10, PR13: 5 }
    ];
  });

  afterEach(() => {});

  it('should formulate the order body without coupon', () => {
    const order = util.formulateOrder(body, result);
    expect(order).toBeObject();
  });

  it('should formulate the order body with coupon (percent)', () => {
    result.push({
      type: 'PERCENT',
      value: 1
    });
    const order = util.formulateOrder(body, result);
    expect(order).toBeObject();
  });

  it('should formulate the order body with coupon (amount)', () => {
    result.push({
      type: 'AMOUNT',
      value: 4
    });
    const order = util.formulateOrder(body, result);
    expect(order).toBeObject();
  });
});
