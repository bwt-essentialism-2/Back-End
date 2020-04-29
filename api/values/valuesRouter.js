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
	const { id } = req.params;
  
	Values.remove(id)
	.then(deleted => {
	  if (deleted) {
		res.json({ removed: deleted });
	  } else {
		res.status(404).json({ message: 'Could not find value with given id' });
	  }
	})
	.catch(err => {
	  res.status(500).json({ message: 'Failed to delete value' });
	});
  });
module.exports = router;