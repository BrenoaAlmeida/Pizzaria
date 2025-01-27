import {Router, Request, Response} from 'express'

import { CreateUserController } from './controllers/User/CreateUserControler';
import { AuthUserController } from './controllers/User/AuthUserController';
import { DetailUserController } from './controllers/User/DetailUserController';
import { CreateCategoryController } from './controllers/Category/CreateCategoryController';
import { ListCategoryController } from './controllers/Category/ListCategoryController';
import { CreateProductController } from './controllers/Product/CreateProductController';
import {ListByCategoryController } from './controllers/Product/ListByCategoryController'
import { CreateOrderController } from './controllers/Order/CreateOrderController';
import { DeleteOrderController } from './controllers/Order/DeleteOrderController';
import { AddItemController } from './controllers/Order/AddItemController';
import { RemoveItemController } from './controllers/Order/RemoveItemController';
import { SendOrderController } from './controllers/Order/SendOrderController';
import { ListOrdersController } from './controllers/Order/ListOrdersController';
import { DetailOrderController } from './controllers/Order/DetailOrderController'
import { FinishOrderController } from './controllers/Order/FinishOrderController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from './config/multer'

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
// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post('/product', isAuthenticated, new CreateProductController().handle)

router.get('/product', isAuthenticated, new ListByCategoryController().handle)

//Ordem
router.post('/order', isAuthenticated, new CreateOrderController().handle)

router.delete('/order', isAuthenticated, new DeleteOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrdersController().handle)

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export {router};    