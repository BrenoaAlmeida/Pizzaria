import { Request, Response } from "express"
import { FinishOrderService } from "../../services/Order/FinishOrderService"

class FinishOrderController {
    async handle(req:Request, res:Response){
        const { order_id } = req.body;
        const finishOrderService = new FinishOrderService();
        const result = await finishOrderService.execute({order_id});
        return res.json(result);
    }
}

export { FinishOrderController }