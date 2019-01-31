/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID
      },
      currency: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.FLOAT
      },
      coupon: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.JSON
      },
      amountToBePaid: {
        type: Sequelize.FLOAT
      },
      paymentId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};