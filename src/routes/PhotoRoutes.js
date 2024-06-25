import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';

import PhotoController from '../controllers/PhotoController.js';

const router = new Router();

router.post('/', loginRequired, PhotoController.store);

export default router;

/*
index        -> Lista todos os usuários -> GET
store/create -> Cria usuários           -> POST
delete       -> Apaga usuários          -> DELETE
show         -> Mostra um usuário       -> GET
update       -> Atualiza usuários       -> PATH ou PUT
*/
