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

//post to store what users' 3 values are
router.post('/:id/values', (req,res) =>{
	const user_id = req.params.id;
	//body

})

router.delete('/')
/*****************************************************************************************
***************************** USER PRIVATE ESSENTIALS ROUTER *****************************
******************************************************************************************/

// returns all essentials for a user's project
router.get('/:id/project/:pid/essentials/', userware.verifyUser, projectware.projectExist, (req, res) => {
	Essentials.findBy({ project_id: req.params.pid })
		.then(ess => {
			res.status(200).json(ess)
		})
})

// returns a specific essential for a user's project ID
router.get('/:id/project/:pid/essentials/:eid', userware.verifyUser, projectware.projectExist, essentialware.essentialExist, (req, res) => {
	Essentials.findBy({ project_id: req.params.pid })
		.then(ess => {
			res.status(200).json(ess)
		})
})

router.post('/:id/projects/:pid/essentials/', userware.verifyUser, projectware.projectExist, essentialware.validateNewEssential, (req, res) => {
	res.status(201).json({ message: `essential was created successfully`, essential: req.essential })
})

router.put('/:id/projects/:pid/essentials/:eid', userware.verifyUser, projectware.projectExist, essentialware.editEssential, (req, res) => {
	res.status(201).json({ message: `essential was created successfully`, essential: req.essential })
})

router.delete('/:id/projects/:pid/essentials/:eid', userware.verifyUser, projectware.projectExist, essentialware.essentialExist, (req, res) => {
  Essentials.remove(req.params.eid)
    .then(() => {
      res.status(204).json({ message: `essential was deleted successfully` })
    })
    .catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
})

module.exports = router;