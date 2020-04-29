const router = require('express').Router();

const Users = require('./usersModel.js');
const userware = require('./userware');
const Projects = require('../projects/projectsModel');
const projectware = require('../projects/projectware');

router.get('/', (req, res) => {
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
});

router.get('/:id', userware.verifyUser, (req, res) => {
	res.status(200).json(req.user)
});

// retrieves all Projects for a Users ID
router.get('/:id/projects', userware.verifyUser, (req, res) => {
  Projects.findByUserId(req.params.id)
    .then(projects => {
      res.status(200).json(projects)
		})
		.catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
})

// Creates projects by automatically taking in user id
router.post('/:id/projects', userware.verifyUser, projectware.validateNewProject, (req, res) => {
	res.status(201).json({ message: `Project was created successfully`})
})

router.delete('/')
module.exports = router;