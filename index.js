const server = require('./api/server.js');
const chalk = require('chalk');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n ${chalk.yellowBright('%%')} Server Running on port: ${PORT} ${chalk.yellowBright('%%')} \n`)
})
