const Gallery = require('../models/Gallery');

exports.createGallery = (req, res) => {
  Gallery.create({ title: req.body.title, creator: req.user._id }, (err) => {
    if (err) {
      res.status(400).send('Error creating gallery', err);
      return;
    }
    console.log('Gallery was successfully created');
    res.status(200).redirect('/');
  });
};

exports.showGalleries = (req, res) => {
  Gallery.find({})
    .then((galleries) => {
      res.render('newGallery', { galleries: galleries });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.showSingleGallery = (req, res) => {
  Gallery.findById({ _id: req.params.id })
    .then((gallery) => {
      res.send(gallery);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteGallery = (req, res) => {
  Gallery.findByIdAndRemove({ _id: req.params.id })
    .then((gallery) => {
      console.log(`Gallery removed with an id of: ${gallery.id}`);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};
