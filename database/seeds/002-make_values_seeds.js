exports.seed = function (knex) {
	return knex('Values')
		.del()
		.then(function () {
			return knex('Values').insert([
				{
					value: 'Adaptability',
				},
				{
					value: 'Art and Beauty',
				},
				{
					value: 'Collaboration',
				},
				{
					value: 'Sense of Community',
				},
				{
					value: 'Competition',
				},
				{
					value: 'Kindness and Generosity',
				},
				{
					value: 'Innovation',
				},
				{
					value: 'Friends and Family',
				},
				{
					value: 'Sustainability',
				},
				{
					value: 'Sense of Humor',
				},
				{
					value: 'Career Success',
				},
				{
					value: 'Helping Others',
				},
				{
					value: 'Adventure',
				},
				{
					value: 'Creativity',
				},
				{
					value: 'Moral Principles',
				},
				{
					value: 'Leadership',
				},
			]);
		});
};