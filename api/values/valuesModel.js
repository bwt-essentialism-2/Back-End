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

function update(id, changes) {
  return db('Values')
    .where('id', id)
    .update(changes)
    .then(count => (count > 0 ? findById(id) : null));
}

function remove(id){
  return db('Values')
      .where({id: id})
      .del()
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
}