const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Word = require('../models/word.model')(sequelize); // Importez Word après avoir défini sequelize

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

    // Assurez-vous que WordModel est correctement importé pour éviter l'erreur
    Topic.hasMany(Word, {
        foreignKey: 'idTopic',
        onDelete: 'CASCADE'
    });

    return Topic;
};
