const db = require('../../config/fire-base');

const find = async ({ model, key, value }) => {
  try {
    if (key) {
      const res = (await db
        .ref(model)
        .orderByChild(key)
        .equalTo(value)
        .once('value')).val();
      return res[Object.keys(res)[0]];
    }
    return (await db.ref(model).once('value')).val();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = find;
