const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Region = require('../models/Region');
const State = require('../models/State');
const City = require('../models/City');
const Year = require('../models/Year');
const YearMonth = require('../models/YearMonth');

const models = [Region,State,City,Year,YearMonth];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));