/* eslint-disable */

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: DataTypes.UUID,
    userId: DataTypes.UUID,
    currency: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    coupon: DataTypes.STRING,
    discount: DataTypes.JSON,
    amountToBePaid: DataTypes.FLOAT,
    paymentId: DataTypes.UUID,
    status: DataTypes.STRING
  }, { paranoid: true });
  // Order.associate = function(models) {
    // associations can be defined here
  // };
  return Order;
};