const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Word = sequelize.define('Word', {
    idWord: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    word_en: {
      type: DataTypes.STRING,
      allowNull: false
    },
    word_fr: {
      type: DataTypes.STRING,
        allowNull: false
    },
    idTopic: {
      type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    tableName: 'WORDS',
    timestamps: false
  });

  return Word;
};
