const db = require('../../database/dbConfig');

const find = () => {
  return db('Projects')
}

const findBy = (filter) => {
  return db('Projects').where(filter)
}

const findById = (id) => {
  return db('Projects').where({ id }).first()
}

const add = async (payload) => {
  [id] = await db('Projects').insert(payload, 'id')
  return findById(id)
}
module.exports = {
  find,
  findBy,
  findById,
  add,
}