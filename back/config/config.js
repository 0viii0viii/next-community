const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  //json이면 dotenv사용 x, js로 확장자명 변경후 module.exports하면  사용가능
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'gunners',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
