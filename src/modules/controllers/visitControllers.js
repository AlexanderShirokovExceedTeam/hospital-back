const Visit = require('../../db/models/visits');

module.exports.getAllVisits = (req, res, next) => {
  Visit.find().then(result => {
		res.send({data: result});
	});
};

module.exports.createNewVisit = (req, res) => {
	if (reqBodyIsValid(req.body)) {
		const visit = new Visit(req.body);
		visit.save().then(result => {
			res.send({data: result});
		});
	} else {
		res.status(400).send({
			message: 'Invalid data'
		});
	}
};

module.exports.changeVisitInfo = (req, res) => {
	if (reqBodyIsValid(req.body)) {
		Visit.updateOne({_id: req.body._id}, req.body).then(result => {
			Visit.find().then(result => {
				res.send({data: result});
			});
		});
	} else {
		res.status(422).send({
			message: 'Error! Fill all fields!'
		});
	}
};

const reqBodyIsValid = (reqBody) => {	
	if (reqBody.hasOwnProperty('patient')
			&& reqBody.hasOwnProperty('doctor')
			&& reqBody.hasOwnProperty('date')
			&& reqBody.hasOwnProperty('problem')) {
		const { patient, doctor, date, problem } = reqBody;
			if (patient
					&& doctor
					&& date
					&& problem) {
				return true;
			} else {
				return false;
			}
	} else {
		return false;
	}
}
