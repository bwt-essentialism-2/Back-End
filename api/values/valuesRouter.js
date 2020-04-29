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
	.then(value => {
		console.log("value: ", value)
        res.status(200).json(value)
    })
    .catch(error => {
    	console.log(error);
    	res.status(500).json({error: error.message});
    })
})

//post to store what users' 3 values are
router.post('/:id', (req,res) =>{

})

router.put('/:id', (req,res) => {
	const id = req.params.id;
	Values.update(id, req.body)
		.then(res => {
			console.log("res: ",res)
			res.status(200).json(res)
		})
		.catch(err => {
			res.status(500).json(res.body.food)
		})
})

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	Values.remove(id)
		.then(res => {
			res.status(200).json(res)
		})
		.catch(err => {
			console.error(err)
			res.status(500).json({message: 'could not delete specified value'})
		})
})
module.exports = router;