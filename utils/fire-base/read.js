const db = require('../../config/fire-base');

const find = async ({ model, id = '' }) => {
  try {
    const res = await db.ref(`/${model}/`).once('value');
    return res.val();
  } catch (err) {
    return err;
  }
};

module.exports = find;
