const exif = require("exif-parser");
const fs = require("fs");
const path = require("path");
const uuidv4 = require("uuid/v4");
const { savingToCloudinary } = require("./cloudinary");

const pictureManager = (req, res, next) => {
  try {
    const parser = exif.create(req.file.buffer);
    const result = parser.parse();
    req.body.GPSLatitude = result.tags.GPSLatitude;
    req.body.GPSLongitude = result.tags.GPSLongitude;
    req.body.DateTimeOriginal = result.tags.DateTimeOriginal;
  } catch (error) {
    console.log("Data not found");
  }
  savingToCloudinary(req, res, req.file, next);
};

const writeImageFile = file => {
  if (file && file.originalname && file.buffer) {
    fs.writeFile(
      path.resolve(__dirname, "..") +
      "/public/images/" +
      uuidv4() +
      "-" +
      file.originalname,
      file.buffer
    ),
      "binary",
      function read(err, data) {
        if (err) {
          throw err;
        }
        content = data;
      };
  }
};

module.exports = pictureManager;
