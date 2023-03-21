import { Sequelize } from 'sequelize';
const config = {
  logging: false,
};
const railway = process.env.DATABASE_URL;

const db = new Sequelize(railway, config);

export default db;
