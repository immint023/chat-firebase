const passport = require('passport');
const httpStatus = require('http-status');

module.exports.authorize = () => (req, res, next) => {
  passport.authenticate('jwt', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next({
        status: httpStatus.UNAUTHORIZED,
        message: 'unauthorized',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
