import multer from 'multer';
import { extname, resolve } from 'path';

const generate = () => Math.floor(Math.random() * 1000 + 1000);

export default {
    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new multer.MulterError('Extencion file invalid, accept (png/jpeg).'))
        }
        return cb(null, true);
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(process.env.DIRNAME, 'uploads', 'images'));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${generate()}${extname(file.originalname)}`)
        }
    })
}