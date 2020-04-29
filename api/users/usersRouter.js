const router = require('express').Router();

const Users = require('./usersModel.js');
const Projects = require('../projects/projectsModel');
const projectware = require('../projects/projectware');

router.get('/', (req, res) => {
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => res.send(err));
});

router.get('/projects/:id', projectware.projectExist, (req, res) => {
  Projects.find()
    .then(projects => {
      res.status(200).json(req.proj)
    })
})

// //todo 
// router.put('/')


router.delete('/')
module.exports = router;