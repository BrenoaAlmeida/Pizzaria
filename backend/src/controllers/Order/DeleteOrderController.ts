import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/Order/DeleteOrderService";

class DeleteOrderController {
    async handle(req:Request, res:Response){
        const order_id = req.query.order_id as string;
        const deleteOrderService = new DeleteOrderService;
        const result = await deleteOrderService.execute({order_id});
        return res.json(result);

    }
}

export { DeleteOrderController }