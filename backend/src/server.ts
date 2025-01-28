import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import path from 'path'

import { router } from './routes';
import  fileupload from 'express-fileupload'

const app = express();
app.use(express.json());
app.use(cors());

app.use(fileupload({
    limits: {fileSize: 50 * 1024 * 1024 } //Enviar imagens de no maximo 50MB
}));

app.use(router);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp'))); //Cria uma rota estatica e passa /files/


//Usar middleWare para tratar erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const request = req;
    //Se for uma instancia do tipo Error
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
});

app.listen(process.env.PORT, () => console.log("Servidor Online!"))

//ts-node-dev Tem funcionalidade de Live Reload e  permite ao node usar um import de um jeito mais moderno

