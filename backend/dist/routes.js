"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserControler_1 = require("./controllers/User/CreateUserControler");
const AuthUserController_1 = require("./controllers/User/AuthUserController");
const DetailUserController_1 = require("./controllers/User/DetailUserController");
const CreateCategoryController_1 = require("./controllers/Category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/Category/ListCategoryController");
const CreateProductController_1 = require("./controllers/Product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/Product/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/Order/CreateOrderController");
const DeleteOrderController_1 = require("./controllers/Order/DeleteOrderController");
const AddItemController_1 = require("./controllers/Order/AddItemController");
const RemoveItemController_1 = require("./controllers/Order/RemoveItemController");
const SendOrderController_1 = require("./controllers/Order/SendOrderController");
const ListOrdersController_1 = require("./controllers/Order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/Order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/Order/FinishOrderController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
router.get('/test', (req, res) => {
    // res.json({nome: "Sujeito sujeitado"})
    throw new Error("Erro ao fazer a requisição");
});
//Usuario
router.post('/users', new CreateUserControler_1.CreateUserController().handle); //Ja passa o  Request e o Response do EXPRESS
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
//Categoria
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
//Produto
// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post('/product', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
router.get('/product', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
//Ordem
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/order', isAuthenticated_1.isAuthenticated, new DeleteOrderController_1.DeleteOrderController().handle);
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
