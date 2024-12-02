import { Request, Response } from "express";
import { ListCategoryService } from "../../services/User/ListCategoryService";

class ListCategoryController {
    async handle(req:Request, res: Response) {
        const listCategoryService = new ListCategoryService()
        const result = await listCategoryService.execute()
        res.json(result)
    }
}

export { ListCategoryController }