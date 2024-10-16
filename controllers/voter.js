const Voter = require("../models/Voter");
const User = require("../models/User");
const AuditTrail = require('../models/AuditTrail');

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
module.exports.updateVoterDetails = async (req, res) => {
    try {
        const voter = await Voter.findById(req.params.voterId);
        if (!voter) {
            return res.status(404).send(false); // Return false if no voter is found
        }

        // Capture changes
        const updatedFields = req.body;
        const changes = [];

        for (const key in updatedFields) {
            if (updatedFields.hasOwnProperty(key) && voter[key] !== updatedFields[key]) {
                changes.push({
                    field: key,
                    old_value: voter[key],
                    new_value: updatedFields[key]
                });
            }
        }

        if (changes.length > 0) {
            // Save the audit trail
            const auditTrailEntry = new AuditTrail({
                voter_id: voter._id,
                updated_by: req.user.username,
                changes: changes
            });
            await auditTrailEntry.save();
        }

        // Update voter details
        const updatedVoter = {
            ...updatedFields,
            encoded_by: req.user.username, // Ensure that `req.user` contains this data
            update_date: new Date()
        };

        await Voter.findByIdAndUpdate(req.params.voterId, updatedVoter, { new: true });
        return res.send(true); // Update successful

    } catch (err) {
        console.error('Error updating voter:', err);
        res.status(500).send(false); // Send false on error
    }
};

// Add New Voter
module.exports.addNewVoter = (req, res) => {
    // Create a new voter based on the request body
    const newVoter = new Voter({
        precint_number: req.body.precint_number,
        fullname: req.body.fullname,
        barangay: req.body.barangay,
        color: req.body.color,
        category: req.body.category,
        encoded_by: req.user.username,
        remarks: req.body.remarks,
        creation_date: new Date()
    });

    // Save the new voter to the database
    newVoter.save()
        .then(savedVoter => {
            // Add an entry to the audit trail
            const auditTrailEntry = new AuditTrail({
                voter_id: savedVoter._id,
                updated_by: req.user.username,  // Change to 'updated_by' for consistency
                update_date: new Date(),  // Default date can also be used
                changes: [
                    { field: 'precint_number', new_value: savedVoter.precint_number },
                    { field: 'fullname', new_value: savedVoter.fullname },
                    { field: 'barangay', new_value: savedVoter.barangay },
                    { field: 'color', new_value: savedVoter.color },
                ]
            });

            // Save the audit trail entry
            return auditTrailEntry.save()
                .then(() => {
                    // Send the saved voter back in the response
                    res.status(201).send(savedVoter);
                });
        })
        .catch(err => {
            console.error('Error adding new voter:', err);
            res.status(500).send({ message: 'Failed to add new voter' });
        });
};

