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

router.get('/:id/projects', userware.verifyUser, (req, res) => {
  Projects.findByUserId(req.params.id)
    .then(projects => {
      res.status(200).json(projects)
		})
		.catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
})

// //todo 
// router.put('/')


router.delete('/')
module.exports = router;