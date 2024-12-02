import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/Category/CreateCategory";

class CreateCategoryController{
    async handle(req: Request, res:Response){
        const { name } = req.body;
        const createCategoryService = new CreateCategoryService();
        const result = await createCategoryService.execute(name);
        return res.json(result);
    }
}

export { CreateCategoryController }