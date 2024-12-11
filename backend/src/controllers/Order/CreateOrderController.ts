import { Request, Response } from "express";
import { CreateOrderService } from "../../services/Order/CreateOrderService";

class CreateOrderController {
    async handle(req: Request, res: Response)
    {
        const {table, name} = req.body;
        const createOrderService = new CreateOrderService();
        const result = await createOrderService.execute({table, name})
        return res.json(result);
    }
}


export { CreateOrderController }