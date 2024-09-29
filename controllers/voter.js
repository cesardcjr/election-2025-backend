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


// Update Voter Details
module.exports.updateVoterDetails = (req, res) => {
    const updatedVoter = {
        precint_number: req.body.precint_number,
        clustered_precint: req.body.clustered_precint,
        fullname: req.body.fullname,
        birthday: req.body.birthday,
        address: req.body.address,
        contact_number: req.body.contact_number,
        category: req.body.category,
        barangay: req.body.barangay,
        referred_by: req.body.referred_by,
        color: req.body.color,
        encoded_by: req.user.username, // Ensure that `req.user` contains this data
        update_date: new Date()
    };

    Voter.findByIdAndUpdate(req.params.voterId, updatedVoter, { new: true })
        .then(voter => {
            if (!voter) {
                return res.status(404).send(false); // Return false if no voter is found
            }
            return res.send(true); // Update successful
        })
        .catch(err => {
            console.error('Error updating voter:', err);
            res.status(500).send(false); // Send false on error
        });
};

