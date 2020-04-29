const router = require('express').Router()

const Projects = require('./projectsModel');
const projectware = require('./projectware');
const Users = require('../users/usersModel');
const userware = require('../users/userware');

/// Retrieve all projects
router.get('/', (req, res) => {
  Projects.find()
    .then(projects => {
      res.status(200).json(projects)
    })
})

// retrieve project by ID
router.get('/:pid', projectware.projectExist, (req, res) => {
      res.status(200).json(req.project)
})

// Delete Project
router.delete('/:pid', projectware.projectExist, (req, res) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(204).json({ message: `project was deleted successfully` })
    })
    .catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
	
})

module.exports = router;