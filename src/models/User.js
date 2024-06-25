import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // Campos não autos
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              message:
                'Campo nome não pode ser vazio e deverá ter entre 3 e 255 caracteres.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            message: 'E-mail já existe.',
          },
          validate: {
            isEmail: {
              message: 'Campo e-mail é inválido.',
            },
          },
        },
        password_hash: Sequelize.STRING,
        password: {
          type: Sequelize.VIRTUAL, // Campo virtual não irá existir na base de dados.
          defaultValue: '',
          validate: {
            len: {
              args: [8, 50],
              message:
                'Campo password não pode ser vazio e deverá ter entre 8 e 50 caracteres.',
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    // Adicionando hook para que seja feita o hash da senha antes de ser salva no banco de dados.
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  passwordIsValid(pass) {
    return bcryptjs.compare(pass, this.password_hash);
  }
}
export default User;