const router = require('express').Router()
const Project = require('./projectsModel');
const projectware = require('./projectware');

/// Retrieve all projects
router.get('/', (req, res) => {
  Project.find()
    .then(projects => {
      res.status(200).json(projects)
    })
})

// retrieve project by ID
router.get('/:id', projectware.projectExist, (req, res) => {
      res.status(200).json(req.project)
})

// Create Project
// router.post('/', userware.userExist, projectware.validateProject, (req, res) => {
//   res.status(201).json(req.project)
// })

// Edit Project
router.put('/:id', projectware.validateProject, (req, res) => {
  Project.update(req.params.id, req.body)
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ errorMessage: `There was a error while retrieving Project.`, err }))
})

// Delete Project
router.delete('/:id', (req, res) => {
  Project.remove(req.params.id)
  .then(() => res.status(201).json({ message: `Project was deleted successfully.` }))
  .catch(err => res.status(500).json({ errorMessage: `There was a error while deleting Post.`, err }))
})

module.exports = router;