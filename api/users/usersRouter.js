const router = require('express').Router();

const Users = require('./usersModel.js');

router.get('/', (req, res) => {
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => res.send(err));
});

// //todo 
// router.put('/')


router.delete('/')
module.exports = router;