/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
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
      status: {
        type: Sequelize.STRING
      },
      meta: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};