require('dotenv').config()
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../middleware/logger');
const authentication = require('../middleware/tokenAuthentication');

// Router endpoints
const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');
const valuesRouter = require('./values/valuesRouter');
const projectsRouter = require('./projects/projectsRouter');
const essentialsRouter = require('./essentials/essentialsRouter');

// Middleware
server.use(cors());
server.use(helmet())
server.use(logger)
server.use(morgan('short'))
server.use(express.json());

// login and Registration
server.use('/api/auth', authRouter);



// Endpoints
server.use('/api/users', authentication, usersRouter);
server.use('/api/values', authentication, valuesRouter);
server.use('/api/projects', authentication, projectsRouter);
server.use('/api/essentials', authentication, essentialsRouter);

server.use('/', (req, res) => {
  res.status(200).json({ message: 'Server is Live' })
})

module.exports = server;