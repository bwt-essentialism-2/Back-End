const knexCleaner = require('knex-cleaner');

exports.seed = async function(knex) {
  await knexCleaner.clean(knex, {
    mode: 'truncate',
    restartIdentity: true,
    ignoreTables: ['knex_migrations', 'knex_migrations_lock']
  });
}