// module to help parse multipart data from form
const formidable = require('formidable');
const fs = require('fs');
const passport = require('passport');

const Image = require('../models/Image');

exports.getImages = (req, res) => {
  Image.find({})
    .then((images) => {
      res.send(images);
    });
};

exports.uploadImage = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).send('Error parsing form', err);
      return;
    }
    fs.readFile(files.file.path, (err, data) => {
      if (err) {
        res.status(400).send('Error parsing form', err);
        return;
      }
      if (data.length === 0) {
        res.status(400).send('No file provided');
        return;
      }
      console.log(`Successfully received a ${data.length} byte file`);

      Image.create({ title: fields.title, photo: data, artist: req.user._id }, (err) => {
        if (err) {
          console.log('Upload failed...');
          return;
        }
        console.log('Upload successful!');
      });
      res.status(200).redirect('/');
    });
  });
};

exports.deleteImage = (req, res) => {
  Image.findByIdAndRemove({ _id: req.params.id })
    .then((image) => {
      res.send(image);
    });
};
