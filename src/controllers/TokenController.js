import User from '../models/User.js';
import jwt from 'jsonwebtoken';

class TokenController {
  async store(req, res) {
    if (!req.body) {
      return res.status(401).json({
        errors: ['Credencials invlaid.'],
      });
    }

    const { email = '', password = '' } = req.body;
    
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credencials not exists.'],
        });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['User not exists.'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Invalid password.'],
      });
    }

    const { id } = user;
    // Primeiro param será os dados do usuário que quero receber de volta após gerar o token.
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}
export default new TokenController();
