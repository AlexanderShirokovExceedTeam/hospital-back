const Visit = require('../../db/models/visits');
const jwt = require('jsonwebtoken');
const key = require('../keys/keys');

module.exports.getAllVisits = async (req, res, next) => {
	const { token } = req.headers;
	const decodedToken = jwt.verify(token, key.jwt);
	const idFromToken = { userId: decodedToken._id };

	Visit.find(idFromToken).then(result => {
		res.send({data: result});
	});
};

module.exports.createNewVisit = async (req, res) => {
	const allFields = true;
	
	if (reqBodyIsValid(req.body, allFields)) {
		const { token } = req.headers;
		const decodedToken = jwt.verify(token, key.jwt);
		req.body.userId = decodedToken._id;		
		const visit = new Visit(req.body);

		visit.save().then(result => {
			Visit.find({ userId: decodedToken._id }).then(result => {
				res.send({ data: result });
			});
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
		const { token } = req.headers;
		const decodedToken = jwt.verify(token, key.jwt);

		Visit.updateOne({_id: req.body._id}, req.body).then(result => {
			Visit.find({ userId: decodedToken._id }).then(result => {
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
		const { token } = req.headers;
		const decodedToken = jwt.verify(token, key.jwt);

		Visit.deleteOne({_id: req.query._id}).then(result => {
			Visit.find({ userId: decodedToken._id }).then(result => {
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
