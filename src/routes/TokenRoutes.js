import { Router } from 'express';
import TokenController from '../controllers/TokenController.js';

const router = new Router();

router.post('/', TokenController.store);

export default router;

/*
index        -> Lista todos os usuários -> GET
store/create -> Cria usuários           -> POST
delete       -> Apaga usuários          -> DELETE
show         -> Mostra um usuário       -> GET
update       -> Atualiza usuários       -> PATH ou PUT
*/
