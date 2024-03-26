const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const LinkTopicOrga = sequelize.define('link_topic_orga', {
        idTopic: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idOrga: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    },
    {
        tableName: 'LINK_TOPIC_ORGA',
        timestamps: false
    });
    return LinkTopicOrga;
}