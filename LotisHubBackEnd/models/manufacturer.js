/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('manufacturer', {
    manufacturer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    manufacturer_name: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'manufacturer'
  });
};
