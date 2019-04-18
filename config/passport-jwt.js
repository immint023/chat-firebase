const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { find } = require('../utils/fire-base');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY,
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async function(payload, done) {
      try {
        const user = await find({
          model: 'users',
          key: 'username',
          value: payload.username,
        });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
