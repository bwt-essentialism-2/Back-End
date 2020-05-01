const router = require('express').Router();
const Users = require('../users/usersModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secrets = require('../secret');

router.post('/register', newUserVerification, (req, res) => {
  const user = req.body;
  const rounds = process.env.HASH_ROUNDS || 12
  const hash = bcrypt.hashSync(user.password, rounds)
  user.password = hash
  
  Users.add(user)
    .then(addedUser => {
      console.log(addedUser)
      res.status(201).json({ message: 'user created successfully.', addedUser })
    })
    .catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  await Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Welcome!", username, token });
      } else {
        res.status(401).json({ message: "You cannot pass!" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

module.exports = router;

async function newUserVerification(req, res, next) {
  const user = req.body;

  if((user.username && user.password) && (user.username.length > 3 && user.password.length > 5)) {
    await next()
  } else {
    res.status(401).json({ errorMessage: `Invalid attempt. username must contain atleast 3 characters & password must be more then 5` })
  }
}

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: process.env.TOKEN_EXPIRE_TIME || "1d",
  };

  return jwt.sign(payload, secret, options);
}