import { ModelStatic, Sequelize } from 'sequelize';
import { isProd } from '../../server';







// const env = process.env.NODE_ENV || 'development';
// // eslint-disable-next-line import/no-dynamic-require
// const config = require(`${__dirname}/../config/config`)[env];

// const sequelize = new Sequelize(config.url || process.env.DATABSE_CONNECTION_URI, config);

const db_dev = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: true,
};

const db_prod = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
};

let sequelize: Sequelize;
if (isProd) {
  console.log('Is prod db');
  sequelize = new Sequelize(db_prod.database, db_prod.username, db_prod.password, {
    host: db_prod.host,
    dialect: db_prod.dialect as any,
  });
} else {
  console.log('Is dev db');
  sequelize = new Sequelize(db_dev.database, db_dev.username, db_dev.password, {
    host: db_dev.host,
    dialect: db_dev.dialect as any,
  });
}

export interface IDBModels {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;

}
const db: IDBModels = {
  sequelize,
  Sequelize,

};

// Object.keys(db).forEach((modelName: string) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
Object.values(db).forEach((model: { associate: (models: IDBModels) => void }) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
