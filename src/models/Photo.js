import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig.js';

export default class Photos extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'field not be empty',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'field not be empty',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`
        }
      }
      
    }, {
      sequelize,
      tableName: 'photos'
    });
    return this;
  }

  static associate(models){
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}