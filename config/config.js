// Database Configuration with Sequelize
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // If JawsDB URL is provided (for production environment)
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JawsDB URL is not provided (for development environment)
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  });
}

module.exports = sequelize;
