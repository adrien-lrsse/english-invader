module.exports = (sequelize, Sequelize) => {
    const Topic = sequelize.define('topic', {
        idTopic: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        idUser: {
            type: Sequelize.INTEGER
        }
    });
    return Topic;
}   