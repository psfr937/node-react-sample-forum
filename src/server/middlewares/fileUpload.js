import path from 'path';
import multer from 'multer';
import mkdirp from 'mkdirp';

// parse multipart/form-data

const initDestination = 'uploads';
const uploadToDisk = ({ destination = initDestination, filename }) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        if (req.user) {
          destination = destination.replace('{userId}', req.user._id);
        }
        const dir = path.join(__dirname, `../../public/${destination}`);
        mkdirp(dir, err => cb(err, dir));
      },
      filename: (req, file, cb) => {
        cb(null, filename || `${file.fieldname}-${Date.now()}`);
      }
    })
  });

const uploadToMemory = multer({
  storage: multer.memoryStorage()
});

export default {
  disk: uploadToDisk,
  memory: uploadToMemory
};
