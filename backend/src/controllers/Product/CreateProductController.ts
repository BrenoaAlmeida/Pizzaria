import { Request, Response } from "express";
import { CreateProductService } from "../../services/Product/CreateProductService";

class  CreateProductController {
        async handle(req: Request, res: Response){

        const {name, price, description, category_id} = req.body;        
        const createProductService = new CreateProductService();
        
        if(!req.file){
            throw new Error("error upload file")
        } else{
        const {originalname, filename: banner} = req.file;

            const result = await createProductService.execute({
                name, price, description, banner, category_id
            });
            return res.json(result)
        }        
    }
}

export {CreateProductController}