const db = require('../../database/dbConfig');


const find = () => {
  return db('users')
}

const findBy = (filter) => {
  return db('users').where(filter)
}

const findById = (id) => {
  return db('users').where({ id }).first()
}

const add = async (payload) => {
  [id] = await db('users').insert(payload, 'id')
  return findById(id)
}
module.exports = {
  find,
  findBy,
  findById,
  add,
}