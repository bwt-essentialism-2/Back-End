const router = require('express').Router();

const Values = require('./valuesModel');

router.get('/', (req, res) => {
	Values.find()
		.then(values => {
			res.status(200).json(values);
		})
		.catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
	Values.findById(req.params.id)
		.then(values => {
			res.status(200).json(values);
		})
		.catch(err => res.send(err));
});

// //todo 
router.post('/', (req, res) => {
	const item = req.body
	if(item.value) {
		Values.add(req.body)
			.then(newVal => {
				res.status(201).json(newVal)
			})
			.catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
	}
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