"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } //Enviar imagens de no maximo 50MB
}));
app.use(routes_1.router);
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp'))); //Cria uma rota estatica e passa /files/
//Usar middleWare para tratar erros
app.use((err, req, res, next) => {
    const request = req;
    //Se for uma instancia do tipo Error
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});
app.listen(process.env.PORT, () => console.log("Servidor Online!"));
//ts-node-dev Tem funcionalidade de Live Reload e  permite ao node usar um import de um jeito mais moderno
