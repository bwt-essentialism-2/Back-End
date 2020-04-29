const Essential = require('./essentialsModel');

// makes sure a essential exist before next()
const essentialExist = (req, res, next) => {
	const { id, eid } = req.params;
	Essential.findById(eid).then(essential => {
		if (essential) {
			req.essential = essential;
			next();
		} else {
			res
				.status(401)
				.json({ errorMessage: `essential by ${eid} doesn't exist` });
		}
	});
};

const validateNewEssential = (req, res, next) => {
	const item = req.body;
	const { id, pid } = req.params;
	const essentialPrint = {
		"name": "",
		"description": "",
		"user_id": id,
		"project_id": pid,
		"essential_status": false
}

	if (item.name && id && pid) {
		Essential.add({
			...essentialPrint,
			name: item.name,
			description: item.description,
			essential_status: item.essential_status || false,
		})
			.then(essential => {
				console.log('essentialAdd', essential)
				req.essential = essential;
				next();
			})
			.catch(err => {
				console.log(err)
				res
					.status(500)
					.json({ errorMessage: `Error creating essential on server end.`, err })
			}
			);
	} else {
		res
			.status(404)
			.json({ errorMessage: `request must contain name, and user_id field.` });
	}
};

const editEssential = (req, res, next) => {
	const item = req.body;
	const { id, pid, eid } = req.params;

	if (pid) {
		Essential.update(eid, item)
			.then(essential => {
				req.essential = essential;
				next();
			})
			.catch(err =>
				res
					.status(500)
					.json({ errorMessage: `Error editing essential on server end.`, err })
			);
	} else {
		res
			.status(404)
			.json({ errorMessage: `request must contain name, and user_id field.` });
	}
};

module.exports = {
	essentialExist,
	validateNewEssential,
	editEssential
};
