/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courier_info', {
    courier_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    courier_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    isVisible: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'courier_info'
  });
};
