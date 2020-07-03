module.exports = function(sequelize, DataTypes) {
    return sequelize.define('clients', {
      client_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      client_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: ''
      },
      client_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: ''
      },
      office_address: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: ''
      },
      office_zipcode: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: ''
      },
      onwer_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: ''
      },
      representative_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: ''
      },
      office_phonenumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: ''
      },
      base_unit_cost: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      packing_unit_cost: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      return_shipping_cost: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      cj_contract_unit_cost: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      on_delivery_cost: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      picking: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      hanjin_boxtype: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      cj_boxtype: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      input_cost: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      output_cost: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      airfare: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      courier_contract_code: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      superviser_code: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      tax_invoice_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      service_start_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      service_end_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: ''
      }
    }, {
      tableName: 'clients'
    });
  };
  