import { Request, Response } from "express";
import { SendOrderService } from "../../services/Order/SendOrderService";

class SendOrderController {
    async handle(req:Request, res: Response) {
        const {order_id} = req.body;
        const sendOrderService = new SendOrderService();
        const result = await sendOrderService.execute({order_id});
        return res.json(result);

    }
}

export { SendOrderController }