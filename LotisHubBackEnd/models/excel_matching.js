module.exports = function(sequelize, DataTypes) {
    return sequelize.define('excel_matching', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        client_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        matching: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'excel_matching'
    });
};
