const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const User = require('./user.model.js');
const Topic = require('./topic.model.js');
const Word = require('./word.model.js');
const Organization = require('./organizations.model.js');
const LinkTopicOrga = require('./link_topic_orga.model.js');
const e = require("express");


const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    storage: config.storage,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
  }
});

const UserModel = User(sequelize);
const TopicModel = Topic(sequelize);
const WordModel = Word(sequelize);
const OrganizationModel = Organization(sequelize);
const LinkTopicOrgaModel = LinkTopicOrga(sequelize);

sequelize.sync()
  .then(() => {
    console.log('Tables synchronisées avec succès');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation des tables :', error);
});

module.exports = {
  UserModel,
  TopicModel,
  WordModel,
  OrganizationModel,
  LinkTopicOrgaModel,
  sequelize
};
