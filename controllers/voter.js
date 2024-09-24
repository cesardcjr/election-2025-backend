const Voter = require("../models/Voter");
const User = require("../models/User");

//Retrieve All Voters
module.exports.getAllVoters = (req,res) => {
	return Voter.find({}).then(result => res.send(result)).catch(err => res.send(err))
};

//Search Voter by Name
module.exports.searchVoterByName = (req,res) => {
	
	const voterName = req.body.fullname;

	Voter.find({ fullname:{ $regex: voterName, $options: 'i' }}).then(result => res.send(result)).catch(err => res.send(err))
};

//Search Voter by ID
module.exports.searchVoterByID = (req,res) => {

	return Voter.findById(req.params.voterId).then(result => res.send(result)).catch(err => res.send(err))
};

//Update Voter Details
module.exports.updateVoterDetails = (req, res) => {

	const updatedVoter = {
		precint_number : req.body.precint_number,
		clustered_precint : req.body.clustered_precint,
		fullname : req.body.fullname,
		address : req.body.address,
		contact_number : req.body.contact_number,
		category : req.body.category,
		barangay : req.body.barangay,
		referred_by : req.body.referred_by,
		color : req.body.color,	
	}

	Voter.findByIdAndUpdate(req.params.voterId, updatedVoter)
		.then((voter, error) => {
			if(error) {
				return res.send(false)
			} else {
				return res.send(true)
			}
		})
		.catch((err) => res.send(err));
};