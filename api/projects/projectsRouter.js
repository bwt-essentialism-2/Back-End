const router = require('express').Router()
const Project = require('./projectsModel');

router.get('/', (req, res) => {
  Project.find()
    .then(projects => {
      res.status(200).json(projects)
    })
})

module.exports = router;