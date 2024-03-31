const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Game = sequelize.define('game', {
        idGame: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idTopic: {
            type: DataTypes.INTEGER
        },
        idUser: {
            type: DataTypes.INTEGER
        },
        score: {
            type: DataTypes.INTEGER
        }
    },
    {
        tableName: 'GAMES',
        timestamps: false
    });

    return Game;
}