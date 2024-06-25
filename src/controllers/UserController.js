import User from '../models/User.js';

class UserController {
  // store/create -> Criar usuário
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, nome, email } = newUser;
      return res.status(200).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        error: e.errors.map((erro) => erro.message),
      });
    }
  }

  // index -> Listar todos os usuários
  async index(req, res) {
    try {
      const AllUsers = await User.findAll({ attributes: [
        'id',
        'nome',
        'email',
        'updated_at',
      ]});
      return res.json(AllUsers);
    } catch (e) {
      return res.json(
        null
      );
    }
  }

  // show -> Listar apenas um usuário por id.
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(
        null
      );
    }
  }

  // update -> Atualizar um usuário por id
  async update(req, res) {
    try {
      const user = await User.findByPk(req.user_id);

      if (!user) {
        return res.status(400).json({
          errors: ['User não encontrado.'],
        });
      }

      await user.update(req.body);
      return res.json('Usuário deletado.');
    } catch (e) {
      return res.status(400).json({
        error: e.errors.map((erro) => erro.message),
      });
    }
  }

  // delete -> Apagar um usuário por id
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.user_id);

      if (!user) {
        return res.status(400).json({
          errors: ['User não encontrado.'],
        });
      }

      await user.destroy();

      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: e.errors.map((erro) => erro.message),
      });
    }
  }
}
export default new UserController();
