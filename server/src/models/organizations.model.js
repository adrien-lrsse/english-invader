const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Organization = sequelize.define('organization', {
        idOrga: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        idUser: {
            type: DataTypes.INTEGER
        }
    },
    {
        tableName: 'ORGANIZATIONS',
        timestamps: false
    });
    return Organization;
}