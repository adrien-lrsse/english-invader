const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Topic = sequelize.define('topic', {
        idTopic: {
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
        tableName: 'TOPICS',
        timestamps: false
    });
    return Topic;
}   