const db = require('../../config/fire-base');

const find = async ({ model, key, value }) => {
  try {
    if (key) {
      return (await db
        .ref(model)
        .orderByChild(key)
        .equalTo(value)
        .once('child_added')).val();
    }
    return (await db.ref(model).once('value')).val();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = find;
