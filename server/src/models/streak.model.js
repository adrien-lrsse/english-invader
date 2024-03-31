const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Streak = sequelize.define('streak', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        streak: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.REAL,
            allowNull: false
        }
        
    },
    {
        tableName: 'STREAK',
        timestamps: false
    });
    return Streak;
}

