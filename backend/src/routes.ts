import {Router, Request, Response} from 'express'
import { CreateUserController } from './controllers//user/CreateUserControler';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

router.get('/test', (req: Request, res: Response) => {
    // res.json({nome: "Sujeito sujeitado"})
    throw new Error("Erro ao fazer a requisição")
})

//Usuario
router.post('/users', new CreateUserController().handle); //Ja passa o  Request e o Response do EXPRESS
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle)


export {router};