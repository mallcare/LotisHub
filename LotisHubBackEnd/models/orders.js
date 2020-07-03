/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    customers_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    order_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tracking_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    customer_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    customer_address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    customer_zipcode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    customer_contact_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    customer_phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    estimated_delivery_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delivery_status: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    delivery_firm: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    isVisible: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'orders'
  });
};
