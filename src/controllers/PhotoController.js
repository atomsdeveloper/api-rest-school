import multer from 'multer';
import multerConfig from '../config/multerConfig.js';

import Photos from '../models/Photo.js';

const upload = multer(multerConfig).single('file');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if(err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

     try {
      const { originalname, filename } = req.file;
      const {student_id} = req.body;
            
      await Photos.create({ originalname, filename, student_id });

      return res.json({ originalname, filename, student_id });
     } catch (e) {
      return res.status(400).json({
        errors: ['Student not exist'],
      })
     }
    })
  }
}
export default new PhotoController();
