const path = require("path");
const uuidv1 = require("uuid/v1");
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");

module.exports.RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  if (error.message) {
    res.status(400).json({
      // message: error.message
      message: "Some thing went wrong, Please Contact Support",
    });
  } else {
    res.status(400).send(error);
  }
};

module.exports.upload_file = async (files, dir, resp) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const myPromise = new Promise(async (resolve, reject) => {
    try {
      let image_file = files;
      let file_name = path.extname(files.name);
      //define upload file name store url
      let audio_file_name = uuidv4() + file_name;
      let audio_path = audio_file_name;
      let file_path = dir + audio_file_name;
      console.log("File path", file_path.replace("./", ""));
      fs.mkdirsSync(dir);
      image_file.mv(file_path, async (err) => {
        if (err) {
          console.log(err);
          resp.error = true;
          resp.error_message = err;
          return resp;
        } else {
          resolve(file_path);
          return (resp.file_path = file_path);
        }
      });
    } catch (error) {
      console.log(error, "error");
      resp.error = true;
      resp.error_message = error;
      return resp;
    }
  });

  console.log("myPromise", myPromise);
  return await myPromise;
};

module.exports.UPLOAD_IMAGE_ON_SERVER = async (file, image_dir, file_name) => {
  if (!fs.existsSync("uploads/")) {
    fs.mkdirSync("uploads/");
  }
  if (!fs.existsSync(image_dir)) {
    fs.mkdirSync(image_dir);
  }
  // Use the mv() method to place the file somewhere on your server
  file.mv(file_name, function (err) {
    if (err) {
      console.log(err, "File Uploading Error");
      return { staus: 400, message: err };
    } else {
      console.log("File Uploaded", file_name);
      return file_name;
    }
  });
};
