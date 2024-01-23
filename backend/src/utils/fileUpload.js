const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {    
    cb(null,
      Date.now() + path.extname(file.originalname),      
    ); 
   
  },
});

const upload = multer({
  storage: storage, limits: {
    fileSize: 1024 * 1024 * 5,    
  },
  fileFilter: (req, file, cb) => { 
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)  
    const extname = fileTypes.test(path.extname(file.originalname));
    if(mimeType && extname) {
      return cb(null, true)
  }
  cb('Give proper files format to upload')
  },
});

module.exports = { upload };
