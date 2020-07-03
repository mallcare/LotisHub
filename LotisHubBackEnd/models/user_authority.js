/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_authority', {
    user_authority_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_authority_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_authority_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'user_authority'
  });
};
