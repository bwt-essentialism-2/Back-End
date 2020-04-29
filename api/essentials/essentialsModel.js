const db = require('../../database/dbConfig');

const find = () => {
  return db('Essentials')
}

const findBy = (filter) => {
  return db('Essentials').where(filter)
}

const findById = (id) => {
  return db('Essentials').where({ id }).first()
}

const findByUserId = (id) => {
  return db('Essentials').where({ user_id: id })
}

const add = async (payload) => {
  [id] = await db('Essentials').insert(payload, 'id')
  return findById(id)
}

function update(id, changes) {
  return db('Essentials')
    .where('id', id)
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));
}

function remove(id) {
  return db('Essentials').where('id', id).del();
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