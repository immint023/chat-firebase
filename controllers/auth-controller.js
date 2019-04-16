const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');

const { find, create } = require('../utils/fire-base');

const saltRounds = 10;

module.exports.register = async (req, res, next) => {
  try {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const isExistUser = await find({
      model: 'users',
      key: 'username',
      value: user.username,
    });
    if (isExistUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: 'Username đã tồn tại',
      });
    }
    await create({
      model: 'users',
      data: {
        ...user,
        password: hashedPassword,
      },
    });
    delete user.password;
    const accessToken = await jwt.sign(user, process.env.JWT_KEY);
    return res.status(httpStatus.OK).json({
      accessToken,
      user,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await find({
      model: 'users',
      key: 'username',
      value: username,
    });
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'username or password is not correct.',
      });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'username or password is not correct.',
      });
    }
    const accessToken = await jwt.sign(user, process.env.JWT_KEY);
    return res.status(httpStatus.OK).json({
      accessToken,
      user,
    });
  } catch (err) {
    return next(err);
  }
};
