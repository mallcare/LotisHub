/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('delivery_status', {
    delivery_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'delivery_status'
  });
};
