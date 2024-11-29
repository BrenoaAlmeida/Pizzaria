import { Request, Response } from "express";
import { AuthUserService } from "../../services/User/AuthUserService";

class AuthUserController {
    async handle(req:Request, res: Response) {
        const {email, password} = req.body
        const authUserService = new AuthUserService()
        const result = await authUserService.execute({email, password})
        console.log(result)
        return res.json(result)
    }
}

export {AuthUserController}