const Sequelize = require('sequelize');

// database connection
const connection = new Sequelize(
  'rm_pmk',
  'root',
  'Isnaisna02#*',
  {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
  },
);

module.exports.connect = connection;