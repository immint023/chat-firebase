const db = require('../../config/fire-base');
const uniqid = require('uniqid');

const create = async ({ model, data }) => {
  try {
    await db.ref(`${model}/${uniqid()}`).set(data);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = create;
