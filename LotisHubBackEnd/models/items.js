/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('items', {
    item_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    item_code: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    item_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    item_model: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    manufacturer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    unit_price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    shipping_unit_price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    items_stock: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'items'
  });
};
