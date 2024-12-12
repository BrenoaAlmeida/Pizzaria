import { Request, Response } from "express"
import { RemoveItemService } from "../../services/Order/RemoveItemService"

class RemoveItemController {
    async handle(req: Request, res:Response) {
        const item_id = req.query.item_id as string;
        console.log(item_id)
        const removeItemService = new RemoveItemService();
        const result = await removeItemService.execute({item_id});
        return res.json(result);
    }
}

export { RemoveItemController }