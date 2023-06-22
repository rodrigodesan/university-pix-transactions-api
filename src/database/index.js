import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Region from '../models/Region';
import State from '../models/State';
import City from '../models/City';
import Year from '../models/Year';
import YearMonth from '../models/YearMonth';
import Transation from '../models/Transation';

const models = [Region, State, City, Year, YearMonth, Transation];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
