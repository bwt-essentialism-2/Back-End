require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../middleware/logger');

const server = express();

server.use(cors());
server.use(helmet())
server.use(logger)
server.use(morgan('short'))
server.use(express.json());

server.use('/', (req, res) => {
  res.status(200).json({ message: 'Server is Live' })
})

module.exports = server;
