import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);
app.use(cors);

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

app.listen(3001, () => console.log("Servidor Online!"))

//ts-node-dev Tem funcionalidade de Live Reload e  permite ao node usar um import de um jeito mais moderno

