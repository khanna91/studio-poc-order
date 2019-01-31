/**
 * Helper Utility
 *
 */
const ORDER_STATUS = {
  CREATED: 'CREATED',
  CANCELLED: 'CANCELLED'
};

exports.ORDER_STATUS = ORDER_STATUS;

const discountType = {
  AMOUNT: 'Amount',
  PERCENT: 'Percent'
};

exports.discountType = discountType;

const randomNumberGenerator = (min, max) => Math.floor(Math.random() * (max - min) + min);

exports.randomNumberGenerator = randomNumberGenerator;

const OK = (res, responseMessage = 'OK', response = null, responseCode = 200) => {
  res.status(responseCode);
  return res.json({
    responseCode,
    responseMessage,
    response
  });
};

exports.OK = OK;

const formulateOrder = (body, result) => {
  let amount = 0;
  const meta = [];
  const prices = result[0];
  const discount = result[1] || null;
  body.orderItems.forEach((item) => {
    const price = item.quantity * prices[item.sku];
    meta.push({ ...item, price });
    amount += price;
  });
  let amountToBePaid = amount;
  if (discount) {
    if (discount.type === discountType.PERCENT) {
      amountToBePaid = amount - ((discount.value / amount) * 100);
    } else if (discount.type === discountType.AMOUNT) {
      amountToBePaid = amount - discount.value;
    }
  }
  return {
    userId: body.userId,
    currency: body.currency,
    coupon: body.coupon,
    amount,
    discount,
    amountToBePaid
  };
};

exports.formulateOrder = formulateOrder;
