const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.datbase,
  config.username,
  config.password,
  config
);

db.User = require('./user')(sequelize, Sequelize); //실행, 생성
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Nestedcomment = require('./nestedcomment')(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
