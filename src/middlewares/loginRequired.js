import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  // Verifcando se o usuário possui o token que é gerado após o usuário logar.
  if (!authorization) {
    return res.status(401).json({
      errors: ['Login is required.'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    // Recuperando os dados do usuário logado para enviar na requisição.
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    // Verificando se existe um usuário com o mesmo token gerado para permanecer logado.
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['User not found.'],
      });
    }

    req.user_id = id;
    req.user_email = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token is invalid or expired.'],
    });
  }
};
