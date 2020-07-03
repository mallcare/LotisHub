/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courier_agency_info', {
    courier_agency_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    courier_agency_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    courier_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'courier_info',
        key: 'courier_id'
      }
    }
  }, {
    tableName: 'courier_agency_info'
  });
};
