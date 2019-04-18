const { firebaseDb } = require('../../config/fire-base');

const find = async ({ model, key, value }) => {
  try {
    if (key) {
      const res = (await firebaseDb
        .ref(model)
        .orderByChild(key)
        .equalTo(value)
        .once('value')).val();
      return res[Object.keys(res)[0]];
    }
    return (await firebaseDb.ref(model).once('value')).val();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = find;
