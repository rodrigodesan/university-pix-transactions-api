import dotenv from 'dotenv';

dotenv.config();

import './database';
import './jobs/updateData';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import cityRoutes from './routes/cityRoutes';
import loginRoutes from './routes/loginRoutes';
import regionRoutes from './routes/regionRoutes';
import stateRoutes from './routes/stateRoutes';
import transationRoutes from './routes/transationRoutes';
import userRoutes from './routes/userRoutes';
import yearMonthRoutes from './routes/yearMonthRoutes';
import yearRoutes from './routes/yearRoutes';

const whiteList = (`${process.env.APP_WHITELIST}`).split(',');

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet({ crossOriginResourcePolicy: false }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/cities', cityRoutes);
    this.app.use('/login', loginRoutes);
    this.app.use('/regions', regionRoutes);
    this.app.use('/states', stateRoutes);
    this.app.use('/transations', transationRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/year-months', yearMonthRoutes);
    this.app.use('/years', yearRoutes);
  }
}

export default new App().app;
