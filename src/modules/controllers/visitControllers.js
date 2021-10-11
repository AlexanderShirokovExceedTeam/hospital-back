const Visit = require('../../db/models/visits');

module.exports.getAllVisits = (req, res, next) => {
  Visit.find().then(result => {
		res.send({data: result});
	});
};

module.exports.createNewVisit = (req, res) => {
	const visit = Visit(req.body);	
	visit.save().then(result => {
		res.send({data: result});
	});
};

module.exports.changeVisitInfo = (req, res) => {
	Visit.updateOne({_id: req.body._id}, req.body).then(result => {
		Visit.find().then(result => {
			res.send({data: result});
		});
	});
};

module.exports.deleteVisit = (req, res) => {
	if (req.query._id) {
		Visit.deleteOne({_id: req.query._id}).then(result => {
			Visit.find().then(result => {
				res.send({data: result});
			});
		});	
	} else {
		res.status(422).send('Error! Params not correct');
	}
};
