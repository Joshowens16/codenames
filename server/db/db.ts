import { Sequelize } from 'sequelize';
const config = {
  logging: false,
};

const db = new Sequelize(process.env.DATABASE_URL);

export default db;
