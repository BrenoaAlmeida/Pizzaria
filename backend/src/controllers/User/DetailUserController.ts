import { Request, Response } from "express"
import { DetailUserService } from "../../services/User/DetailUserService"

class DetailUserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id
        const detailUserService = new DetailUserService();
        const result = await detailUserService.execute(user_id);
        return res.json(result)
    }
}

export { DetailUserController }