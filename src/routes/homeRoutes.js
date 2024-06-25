import { Router } from 'express';
import HomeController from '../controllers/HomeController.js';

const router = new Router();

router.get('/', HomeController.index);

export default router;

/*
index        -> Lista todos os usuários -> GET
store/create -> Cria usuários           -> POST
delete       -> Apaga usuários          -> DELETE
show         -> Mostra um usuário       -> GET
update       -> Atualiza usuários       -> PATH ou PUT
*/
