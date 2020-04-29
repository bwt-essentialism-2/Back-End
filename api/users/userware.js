const User = require('./usersModel');

const verifyUser = (req, res, next) => {
  User.findById
}

module.exports = {
  verifyUser,
}