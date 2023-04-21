const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "./resources", "./images"));
    },
    filename: (req, file, cb) => {
        let filename;
        filename = Date.now().toString().slice(0, -3) + ".jpg"
        req.body.image = filename;
        cb(null, filename);
    }
});
const upload = multer({ storage: storage })

module.exports = { upload };