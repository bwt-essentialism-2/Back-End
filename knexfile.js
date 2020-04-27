require('dotenv').config();
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host:     process.env.DATABASE_URL || '127.0.0.1',
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DBNAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host:     process.env.DATABASE_URL || '127.0.0.1',
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DBNAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
