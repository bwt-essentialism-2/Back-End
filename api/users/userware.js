const User = require('./usersModel');

// makes sure a user exist before next()
const verifyUser = (req, res, next) => {
  const id = req.tk.userId
  User.findById(id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(401).json({ errorMessage: `user ID ${id} doesn't exist` })
      }
    })
}

module.exports = {
  verifyUser,
}