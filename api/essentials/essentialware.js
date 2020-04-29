const Essential = require('./essentialsModel');

// makes sure a essential exist before next()
const essentialExist = (req, res, next) => {
	const { id, eid } = req.params;
	Essential.findById(id || eid).then(essential => {
		if (essential) {
			req.essential = essential;
			next();
		} else {
			res
				.status(401)
				.json({ errorMessage: `essential by ${id ? id : eid} doesn't exist` });
		}
	});
};

module.exports = {
	essentialExist,

};
