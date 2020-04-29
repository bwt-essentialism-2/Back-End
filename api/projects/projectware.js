const Project = require('./projectsModel');

const validateProject = (req, res, next) => {
  const item = req.body
  if(item.name && item.user_id) {
    Project.add({
      name: item.name,
      description: item.description,
      project_status: item.project_status,
      user_id: item.user_id
    })
      .then(project => {
        req.project = project
        next();
      })
      .catch(err => res.status(500).json({ errorMessage: `Error creating project on server end.`, err }))
  } else {
    res.status(404).json({ errorMessage: `request must contain name, and user_id field.` })
  }
}

const projectExist = (req, res, next) => {
  const id = req.params.id
  Project.findById(req.params.id)
    .then(project => {
      if (project) {
        req.project = project
        next()
      } else {
        res.status(401).json({ errorMessage: `project by ${id} doesn't exist` })
      }
    })
}

module.exports = {
  projectExist,
  validateProject
}