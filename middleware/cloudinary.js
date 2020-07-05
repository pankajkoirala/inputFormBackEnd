const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
require("dotenv").config();

//To store in cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "CGI_demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }],
  exif: true,
  resource_type: ["image", "raw"]
});

const savingToCloudinary = async (req, res, file, next) => {
  if (file && file.originalname && file.buffer) {
    cloudinary.v2.uploader
      .upload_stream({ resource_type: "image" }, function (error, result) {
        if (!result) {
          req.body.picture =
            "https://www.radiationshieldinginc.com/assets/img/no-img-large.jpg";
        } else { req.body.picture = result.secure_url; }

        next();
      })
      .end(file.buffer);
  } else {
    req.body.picture =
      "https://www.radiationshieldinginc.com/assets/img/no-img-large.jpg";
    next();
  }
};

module.exports = { savingToCloudinary };
