const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FollowedOrga = sequelize.define('followed_orga', {
        idOrga: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    },
    {
        tableName: 'FOLLOWED_ORGA',
        timestamps: false
    });
    return FollowedOrga;
}