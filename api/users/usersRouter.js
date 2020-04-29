const router = require('express').Router();

const Users = require('./usersModel.js');
const userware = require('./userware');
const Projects = require('../projects/projectsModel');
const projectware = require('../projects/projectware');
const Essentials = require('../essentials/essentialsModel');
const essentialware = require('../essentials/essentialware');

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

/*****************************************************************************************
***************************** USER PRIVATE PROJECTS ROUTER *******************************
******************************************************************************************/

// retrieves all Projects for a Users ID
router.get('/:id/projects', userware.verifyUser, (req, res) => {
  Projects.findByUserId(req.params.id)
    .then(projects => {
      res.status(200).json(projects)
		})
		.catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
})

// Creates projects by automatically taking in user ID
router.post('/:id/projects', userware.verifyUser, projectware.validateNewProject, (req, res) => {
	res.status(201).json({ message: `Project was created successfully`})
})

// Edit Project by automatically taking in User ID & project ID
router.put('/:id/projects/:pid', userware.verifyUser, projectware.projectExist, projectware.editProject, (req, res) => {
  res.status(201).json(req.project)
})

/*****************************************************************************************
***************************** USER PRIVATE ESSENTIALS ROUTER *****************************
******************************************************************************************/

router.post('/:id/projects/:pid/essentials/', userware.verifyUser, projectware.projectExist, essentialware.validateNewEssential, (req, res) => {
	res.status(201).json({ message: `essential was created successfully`, essential: req.essential })
})


module.exports = router;