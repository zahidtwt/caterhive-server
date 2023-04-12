const cloudinary = require('cloudinary').v2;

const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_API_SECRET,
} = require('../config');

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

cloudinary.api.create_upload_preset({
  name: 'caterhive',
  folder: 'caterhive',
});

async function uploadImageToCloudinary(
  fileString,
  width = 1000,
  height = 1000
) {
  return await cloudinary.uploader
    .upload(fileString, {
      upload_preset: 'caterhive',
      width,
      height,
      fetch_format: 'auto',
      format: 'webp',
      crop: 'fill',
    })
    .catch((error) => `Cloudinary error: ${error}`);
}

async function deleteImageFromClodinary(id) {
  return await cloudinary.uploader.destroy(id);
}

module.exports = {
  cloudinary,
  uploadImageToCloudinary,
  deleteImageFromClodinary,
};
