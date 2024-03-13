import { Sequelize } from 'sequelize';
import path from 'path';
const config = {
  development: {
    username: 'root',
    password: 'maiko',
    database: 'student_bill',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    // Configuration for production environment
  }
};

// const env = process.env.NODE_ENV || 'development';
// const configPath = path.join(__dirname, '..', '..', 'config.js');
// const config = require(configPath)[env];

const sequelize = new Sequelize(
  config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: 'mysql',

  // models: [__dirname + '/models'],
});

export { Sequelize, sequelize };