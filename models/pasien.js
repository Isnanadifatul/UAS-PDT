const connection = require('../db-config/connect');
const {DataTypes} = require('sequelize');
const mysql = require('mysql2/promise');

const dbConnection = connection.connect;

const Pasien = dbConnection.define('pasien', {
      id_pasien: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama_pasien: {
          type: DataTypes.STRING
      },
      jenis_kelamin : {
          type: DataTypes.STRING
      },
      alamat : {
          type: DataTypes.STRING
      },
      usia : {
          type:  DataTypes.INTEGER
      },
      no_telp : {
        type:  DataTypes.STRING
      },
      registration_date: {
          type:  DataTypes.DATE
      }
},
{
    freezeTablename: true,
    timestamps: false
});


  // Insert pasien baru
  const insertUser = async (nama_pasien, jenis_kelamin, alamat, usia, no_telp) => {
    try {
      const newUser = await Pasien.create({ nama_pasien, jenis_kelamin, alamat, usia, no_telp });
      console.log('User inserted:', newUser.toJSON());
    } catch (error) {
      console.error('Error inserting user:', error.message);
      throw error;
    }
  };

  //Read Pasien
  


module.exports = { Pasien, insertUser};
