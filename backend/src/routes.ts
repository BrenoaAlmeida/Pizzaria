import {Router, Request, Response} from 'express'
import { CreateUserController } from './controllers/CreateUserControler';

const router = Router();

router.get('/test', (req: Request, res: Response) => {
    // res.json({nome: "Sujeito sujeitado"})
    throw new Error("Erro ao fazer a requisição")
})

router.post('/users', new CreateUserController().handle); //Ja passa o  Request e o Response do EXPRESS

export {router};