const db = require('../../database/dbConfig');


const find = () => {
  return db('Values')
}

const findBy = (filter) => {
  return db('Values').where(filter)
}

const findById = (id) => {
  return db('Values').where({ id }).first()
}

const add = async (payload) => {
  [id] = await db('Values').insert(payload, 'id')
  return findById(id)
}

module.exports = {
  find,
  findBy,
  findById,
  add,
}