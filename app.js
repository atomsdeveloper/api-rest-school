import express from 'express';
import { resolve } from 'path';

import cors from 'cors';
import helmet from 'helmet';

import HomeRoutes from './src/routes/HomeRoutes.js';
import UserRoutes from './src/routes/UserRoutes.js';
import TokenRoutes from './src/routes/TokenRoutes.js';
import AlunoRoutes from './src/routes/AlunoRoutes.js';
import PhotoRoutes from './src/routes/PhotoRoutes.js';

import './src/database/index.js';

const whiteList = [
  'https://escola.atomsdev.com.br',
  'http://localhost:3000',
]

const corsOptions = {
  origin: function(origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowesd by cors'))
    }
  }
}

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(process.env.DIRNAME, 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', HomeRoutes);
    this.app.use('/users/', UserRoutes);
    this.app.use('/tokens/', TokenRoutes);
    this.app.use('/alunos/', AlunoRoutes);
    this.app.use('/photos/', PhotoRoutes);
  }
}

export default new App().app;
