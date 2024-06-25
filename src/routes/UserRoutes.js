import { Router } from 'express';
import UserController from '../controllers/UserController.js';

import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.post('/', loginRequired, UserController.store);

// Não deveria existir
router.get('/', UserController.index); // Lista todos os usuários
// router.get('/:id', loginRequired, UserController.show); // Lista apenas um usuário

router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;

/*
index        -> Lista todos os usuários -> GET
store/create -> Cria usuários           -> POST
delete       -> Apaga usuários          -> DELETE
show         -> Lista um usuário        -> GET
update       -> Atualiza usuários       -> PATH ou PUT
*/
