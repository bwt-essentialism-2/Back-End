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
router.post('/', (req,res) =>{
	console.log("req.body: ",req.body)
	Values.add(req.body)
		.then(res => {
			res.status(201).json(res)
		})
		.catch(err => {
			console.error(err)
			res.status(500).json(err)
		})
})

router.put('/:id', (req,res) => {
	const id = req.params.id;
	Values.update(id, req.body)
		.then(res => {
			res.status(200).json(res)
		})
		.catch(err => {
			res.status(500).json(err)
		})
})
// router.delete('/')
module.exports = router;