/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('courier_issuance_code', {
    courier_issuance_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    courier_agency_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'courier_agency_info',
        key: 'courier_agency_id'
      }
    },
    courier_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'courier_info',
        key: 'courier_id'
      }
    }
  }, {
    tableName: 'courier_issuance_code'
  });
};
