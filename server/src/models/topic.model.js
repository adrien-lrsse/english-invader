const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Word = require('../models/word.model')(sequelize);

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

    Topic.hasMany(Word, {
        foreignKey: 'idTopic',
        onDelete: 'CASCADE'
    });

    return Topic;
};
