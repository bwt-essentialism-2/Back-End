const db = require('../../database/dbConfig');


const find = () => {
  return db('Users')
}

const findBy = (filter) => {
  return db('Users').where(filter)
}

const findById = (id) => {
  return db('Users').where({ id }).first()
}

const add = async (payload) => {
  [id] = await db('Users').insert(payload, 'id')
  return findById(id)
}

//function to assign values to user
const saveValueToUser = () => {
  return {};
} 
module.exports = {
  find,
  findBy,
  findById,
  add,
  saveValueToUser,
}