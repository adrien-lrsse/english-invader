module.exports = {
    HOST : "localhost",
    USER : "root",
    PASSWORD : "",
    DB : "db",
    dialect: 'sqlite',
    storage: 'db/db.sqlite', // Spécifiez le chemin où vous souhaitez stocker la base de données SQLite
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  