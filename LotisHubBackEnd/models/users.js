/* jshint indent: 2 */
const jwt = require("jsonwebtoken");

module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    user_password: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_company_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'company',
        key: 'company_id'
      }
    },
    user_authority_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user_authority',
        key: 'user_authority_id'
      }
    },
    user_address: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    user_zipcode: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ''
    },
    user_contact_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    create_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });

  Users.associate = function(models) {
    // associations can be defined here
  };

  Users.prototype.generateAuthToken = function() {
    const token = jwt.sign(
      { id: this.id, username: this.user_name },
      process.env.jwtPrivateKey
    );
    return token;
  };

  return Users;

};
