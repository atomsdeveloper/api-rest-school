import Sequelize from 'sequelize';
import database from '../config/database.js';

//Models
import Aluno from '../models/Aluno.js';
import User from '../models/User.js';
import Photos from '../models/Photo.js';

const models = [Aluno, User, Photos];

const connection = new Sequelize(database);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
