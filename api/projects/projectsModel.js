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

const findByUserId = (id) => {
  return db('Projects').where({ user_id: id })
}

const add = async (payload) => {
  [id] = await db('Projects').insert(payload, 'id')
  return findById(id)
}

function update(id, changes) {
  return db('Projects')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('Projects').where('id', id).del();
}

module.exports = {
  find,
  findBy,
  findById,
  findByUserId,
  add,
  update,
  remove,
}