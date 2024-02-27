module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        idUser: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mail: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return User;
}