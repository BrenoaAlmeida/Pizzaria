import { Request, Response } from "express";
import { ListOrdersService } from "../../services/Order/ListOrdersService";

class ListOrdersController {
    async handle(req:Request, res:Response){
        const listOrdersService = new ListOrdersService();
        const result = await listOrdersService.execute();
        return res.json(result)
    }
}

export { ListOrdersController }