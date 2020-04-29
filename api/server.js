require('dotenv').config()
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../middleware/logger');
const authentication = require('../middleware/tokenAuthentication');

const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');
const valuesRouter = require('./values/valuesRouter');
const projectsRouter = require('./projects/projectsRouter');

server.use(cors());
server.use(helmet())
server.use(logger)
server.use(morgan('short'))
server.use(express.json());

// login and Registration
server.use('/api/auth', authRouter);

// JWT required beyond here
process.env.DB_ENV === 'production' ? server.use(authentication) : null

// Endpoints
server.use('/api/users', usersRouter);
server.use('/api/values', valuesRouter);
server.use('/api/projects', projectsRouter);

server.use('/', (req, res) => {
  res.status(200).json({ message: 'Server is Live' })
})

module.exports = server;