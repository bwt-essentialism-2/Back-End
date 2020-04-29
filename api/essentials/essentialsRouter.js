const router = require('express').Router()

const Essentials = require('./essentialsModel');
const essentialware = require('./essentialware');
const Projects = require('../projects/projectsModel');
const projectware = require('../projects/projectware');
const Users = require('../users/usersModel');
const userware = require('../users/userware');

// return all essentials
router.get('/', (req, res) => {
  Essentials.find()
    .then(essential => {
      res.status(200).json(essential)
    })
})

// retrieve essentials by ID
router.get('/:id', essentialware.essentialExist, (req, res) => {
  res.status(200).json(req.essential)
})

router.delete('/:id', essentialware.essentialExist, (req, res) => {
  Essentials.remove(req.params.id)
    .then(() => {
      res.status(204).json({ message: `essential was deleted successfully` })
    })
    .catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
	
})

module.exports = router