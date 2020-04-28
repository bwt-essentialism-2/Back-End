const knexCleaner = require('knex-cleaner');
exports.seed = function(knex) {
	knexCleaner.clean(knex).then(() => {
    return null;
  });
};