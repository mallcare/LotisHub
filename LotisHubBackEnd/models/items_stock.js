/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('items_stock', {
    items_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    items_stock: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'items_stock'
  });
};
