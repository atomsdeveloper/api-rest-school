import { Router } from 'express';
import AlunoController from '../controllers/AlunoController.js';

import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.get('/', AlunoController.index);
router.post('/', loginRequired, AlunoController.store); 
router.get('/:id', AlunoController.show); 
router.put('/:id', loginRequired, AlunoController.update);
router.delete('/:id',loginRequired, AlunoController.delete);

export default router;

/*
index        -> Lista todos os usuários -> GET
store/create -> Cria usuários           -> POST
delete       -> Apaga usuários          -> DELETE
show         -> Mostra um usuário       -> GET
update       -> Atualiza usuários       -> PATH ou PUT
*/
