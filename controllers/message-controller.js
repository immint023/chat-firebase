const { find, create } = require('../utils/fire-base');

module.exports.getList = async (req, res, next) => {
  try {
    const messages = await find({
      model: 'messages',
    });
    return res.json(messages);
  } catch (err) {
    return next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      date: new Date().toString(),
    };
    await create({
      model: 'messages',
      data,
    });
    res.json({
      message: 'Done',
    });
  } catch (err) {
    return next(err);
  }
};
