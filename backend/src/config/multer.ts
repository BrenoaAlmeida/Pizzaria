import multer from 'multer'
import crypto from  'crypto'
import {extname, resolve} from 'path'

export default{
    upload(folder:string){
        return {
            storage: multer.diskStorage({
            //__dirname é o diretorio atual
            destination: resolve(__dirname, '..', '..', folder),
            filename: (request, file, callback) => {
                const fileHash = crypto.randomBytes(16).toString("hex")
                const fileName = `${fileHash}-${file.originalname}`
                return callback(null, fileName);
                }
            })
        }
    }
}