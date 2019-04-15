const db = require('../../config/fire-base');
const uniqid = require('uniqid');

const create = async ({ model, data }) => {
  try {
    await db.ref(`${model}/${uniqid()}`).set(data);
  } catch (err) {
    return err;
  }
};

module.exports = create;