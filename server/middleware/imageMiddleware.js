const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const upload = multer({ dest: "./server/images" });

function imageUrl(req, res, next) {
  try {
    if (req.file) {
      const url = process.env.NODE_ENV === "development" ? `http://localhost:8080/${req.file.path}` : `https://yulred-pet-adoption.onrender.com/${req.file.path}`;
      req.body.picture = url;
      next();
    }
    else next();
  } catch(err) {
    res.status(500).send(err);
  }
}

cloudinary.config({ 
  cloud_name: "dtf9l0vfb", 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET,
})

function cloudinaryUpload(req, res, next) {
  try {
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) { 
          console.log(err);
          return;
        }

        req.body.picture = result.secure_url;
        fs.unlinkSync(req.file.path);
        next();
      })
    }
    else next();
  } catch(err) {
    console.log(err);
  }
}

module.exports = { upload, imageUrl, cloudinaryUpload };