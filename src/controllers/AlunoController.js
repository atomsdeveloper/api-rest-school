import Aluno from '../models/Aluno.js';
import Photos from '../models/Photo.js'

class AlunoController {
  // index -> Lista todos os usuários
  async index(req, res) {
    const students = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura', 'updated_at'],
      order: [['id', 'DESC'], [Photos, 'id', 'DESC']],
      include: {
        model: Photos,
        attributes: ['url', 'filename']
      }
    });
    res.status(200).json(students);
  }

  // store/create -> Criar usuário
  async store(req, res) {
    try {
      const student = await Aluno.create(req.body);
      return res.status(200).json(student);
    } catch (e) {
      return res.status(400).json({
        error: e.errors.map((erro) => erro.message),
      });
    }
  }

  // show -> Listar apenas um usuário por id.
  async show(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ['Cannot read id.']
        })
      }

      const student = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura', 'updated_at'],
        order: [['id', 'DESC'], [Photos, 'id', 'DESC']],
        include: {
          model: Photos,
          attributes: ['url', 'filename']
        }
      });

      if(!student) {
        return res.status(400).json({
          errors: ['Student not exists.']
        })
      }

      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(erro => erro.message)
      })
    }
  }

  // update -> Atualizar um usuário por id
  async update(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ['Cannot read id.']
        })
      }

      const student = await Aluno.findByPk(id);

      if(!student) {
        return res.status(400).json({
          errors: ['Student not exists.']
        })
      }

      const studentUpdate = await student.update(req.body)

      return res.json(studentUpdate);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(erro => erro.message)
      })
    }
  }

  // delete -> Apagar um usuário por id
  async delete(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({
          errors: ['Cannot read id.']
        })
      }

      const student = await Aluno.findByPk(id);

      if(!student) {
        return res.status(400).json({
          errors: ['Student not exists.']
        })
      }

      await student.destroy()
      return res.json({
        delete: true
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(erro => erro.message)
      })
    }
  }
}
export default new AlunoController();
