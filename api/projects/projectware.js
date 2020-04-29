const Project = require('./projectsModel');

// makes sure a project exist before next()
const projectExist = (req, res, next) => {
	const id = req.params.id;
	Project.findById(req.params.id).then(project => {
		if (project) {
			req.project = project;
			next();
		} else {
			res.status(401).json({ errorMessage: `project by ${id} doesn't exist` });
		}
	});
};

// verifys a new project has the correct data before adding to DB
const validateNewProject = (req, res, next) => {
	const item = req.body;
  const id = req.params.id;
  const projectPrint = {
    name: '',
    description: '',
    project_status: false,
    user_id: Number,
  };

	if (item.name && id) {
		Project.add({
      ...projectPrint,
			name: item.name,
			description: item.description,
			project_status: item.project_status,
			user_id: id,
		})
			.then(project => {
				req.project = project;
				next();
			})
			.catch(err =>
				res
					.status(500)
					.json({ errorMessage: `Error creating project on server end.`, err })
			);
	} else {
		res
			.status(404)
			.json({ errorMessage: `request must contain name, and user_id field.` });
	}
};

module.exports = {
	projectExist,
	validateNewProject,
};
