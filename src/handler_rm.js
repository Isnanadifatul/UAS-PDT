const Joi = require('@hapi/joi'); //mendefinisikan skema data dan meng validasi objek javascript terhadap skema tsb
const {DataTypes, Op} = require('sequelize');
const {insertUser, Pasien} = require('../models/pasien');

