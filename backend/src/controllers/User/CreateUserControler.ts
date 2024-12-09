import { Request, response, Response } from 'express';
import { CreateUserService } from '../../services/User/CreateUserService'

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body; //Desconstrução dos dados do Request
        const createUserService = new CreateUserService();
        const result = await createUserService.execute({
             name,
             email,
             password
        });

        return res.json(result);
    }   

}

export {CreateUserController} 