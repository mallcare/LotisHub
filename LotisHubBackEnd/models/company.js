/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company', {
    company_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    company_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    company_address: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: ''
    },
    company_zipcode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    company_contact_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ''
    },
    company_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'company_type',
        key: 'company_type_id'
      }
    },
    company_is_mine: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    business_registration_number: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'company'
  });
};
