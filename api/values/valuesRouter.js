const router = require('express').Router();

const Values = require('./valuesModel.js');

router.get('/', (req, res) => {
	Values.find()
		.then(values => {
			res.status(200).json(values);
		})
		.catch(err => res.send(err));
});

// //todo 
// router.put('/')


// router.delete('/')
module.exports = router;