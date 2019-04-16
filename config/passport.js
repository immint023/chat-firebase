const LocalStrategy = require('passport-local').Strategy;

const { find } = require('../utils/fire-base');

async function handleLogin(username, password, done) {
  const user = await find({
    model: 'users',
    key: 'username',
    value: username,
  });
  if (!user) {
    return done(null, false, {
      message: 'Incorrect username.',
    });
  }
}

module.exports.login = new LocalStrategy(handleLogin);
