const Visit = require('../../db/models/visits');

module.exports.getAllVisits = (req, res, next) => {
  Visit.find().then(result => {
		res.send({data: result});
	});
};
