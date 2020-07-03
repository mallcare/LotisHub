/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courier_info_view', {
    courier_agency_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    courier_issuance_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    courier_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    courier_agency_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'courier_info_view'
  });
};
