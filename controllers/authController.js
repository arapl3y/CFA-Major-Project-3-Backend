const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
  successRedirect: '/',
  successFlash: 'Welcome!',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now logged out!');
  res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'Oops! You must be logged in!');
  res.redirect('/login');
};
