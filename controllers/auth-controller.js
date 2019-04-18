const admin = require('firebase-admin');

const { firebaseAuth } = require('../config/fire-base');

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body;
    const { user } = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password,
    );
    await firebaseAuth.currentUser.updateProfile({
      displayName: displayName,
    });

    const {
      providerData: [userProfile],
      stsTokenManager,
    } = user.toJSON();

    return res.json({
      user: userProfile,
      token: stsTokenManager,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { user } = await firebaseAuth.signInWithEmailAndPassword(
      email,
      password,
    );

    const {
      providerData: [userProfile],
      stsTokenManager,
    } = user.toJSON();

    return res.json({
      user: userProfile,
      token: stsTokenManager,
    });
  } catch (err) {
    return next(err);
  }
};
