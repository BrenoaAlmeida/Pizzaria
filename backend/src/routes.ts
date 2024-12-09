import {Router, Request, Response} from 'express'
import { CreateUserController } from './controllers/User/CreateUserControler';
import { AuthUserController } from './controllers/User/AuthUserController';
import { DetailUserController } from './controllers/User/DetailUserController';
import { CreateCategoryController } from './controllers/Category/CreateCategoryController';
import { ListCategoryController } from './controllers/Category/ListCategoryController';
import { CreateProductController } from './controllers/Product/CreateProductController';
import {ListByCategoryController } from './controllers/Product/ListByCategoryController'

import { isAuthenticated } from './middlewares/isAuthenticated';
import uploadConfig from './config/multer'
import multer from 'multer';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

router.get('/test', (req: Request, res: Response) => {
    // res.json({nome: "Sujeito sujeitado"})
    throw new Error("Erro ao fazer a requisição")
})

//Usuario
router.post('/users', new CreateUserController().handle); //Ja passa o  Request e o Response do EXPRESS
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle)

//Categoria
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//Produto
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/product', isAuthenticated, new ListByCategoryController().handle)

export {router};