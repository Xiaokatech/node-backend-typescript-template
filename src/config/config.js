require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'followparistest',
    host: 'db',
    dialect: 'postgres',
    logging: true,
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'followparistest',
    host: 'db',
    dialect: 'postgres',
    logging: true,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: true,
  },
};
