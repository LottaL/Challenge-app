'use strict';
const sharp = require('sharp');

const resizeimg = (file, size, newPath) => {
  return sharp(file)
  .resize(size)
  .toFile(newPath).then((data) => {
    console.log(data);
    return data;
  }).catch((err) => {
    console.log('RESIZE SAYS'+err);
  });
};

const extension = (param) => {
  var jpeg = param.split('.');
  var extension = jpeg[jpeg.length-1];
  //console.log(extension);
  return extension;

};

module.exports = {
  resizeimg: resizeimg,
  extension: extension,
};