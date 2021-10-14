const Visit = require('../../db/models/visits');

module.exports.getAllVisits = async (req, res, next) => {
  Visit.find().then(result => {
		res.send({data: result});
	});
};

module.exports.createNewVisit = async (req, res) => {
	const allFields = true;
	if (reqBodyIsValid(req.body, allFields)) {
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

module.exports.changeVisitInfo = async (req, res) => {
	const noAllFields = false;
	if (reqBodyIsValid(req.body, noAllFields)) {
		Visit.updateOne({_id: req.body._id}, req.body).then(result => {
			Visit.find().then(result => {
				res.send({data: result});
			});
		});
	} else {
		res.status(422).send({
			message: 'Error! Fill some or all fields!'
		});
	}
};

module.exports.deleteVisit = async (req, res) => {
	if (req.query._id) {
		Visit.deleteOne({_id: req.query._id}).then(result => {
			Visit.find().then(result => {
				res.send({data: result});
			});
		});
	} else {
		return res.status(422).send('Error! Param is not correct');
	}
};

const reqBodyIsValid = (reqBody, fillAllFields) => {
	if (fillAllFields
			&& reqBody.hasOwnProperty('patient')
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
	} else if (!fillAllFields
						&& reqBody.hasOwnProperty('_id')
						&& (reqBody.hasOwnProperty('patient')
						|| reqBody.hasOwnProperty('doctor')
						|| reqBody.hasOwnProperty('date')
						|| reqBody.hasOwnProperty('problem'))) {
		return true;
	} else {
		return false;		
	}
}
