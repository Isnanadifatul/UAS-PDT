const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const Rekam = dbConnection.define('rekam_medis', {
    id_

}
);