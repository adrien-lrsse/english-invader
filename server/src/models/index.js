const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: config.dialect,
  storage: config.storage,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js');
db.topic = require('../models/topic.model.js');

module.exports = db;
