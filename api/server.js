require('dotenv').config()
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../middleware/logger');

const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');
const valuesRouter = require('./values/valuesRouter');
const projectsRouter = require('./projects/projectsRouter');

server.use(cors());
server.use(helmet())
server.use(logger)
server.use(morgan('short'))
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/values', valuesRouter);
server.use('/api/auth', authRouter);
server.use('/api/projects', projectsRouter);

server.use('/', (req, res) => {
  res.status(200).json({ message: 'Server is Live' })
})

module.exports = server;