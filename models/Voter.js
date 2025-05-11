//Voters Model

const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({

	precint_number: {
		type: String
	},
	clustered_precint: {
		type: String
	},
	fullname: {
		type: String
	},
	address: {
		type: String
	},
	birthday: {
		type: String
	},
	contact_number: {
		type: String
	},
	category: {
		type: String
	},
	barangay: {
		type: String
	},
	referred_by: {
		type: String
	},
	update_date: {
		type: Date
	},
	updated_by: {
		type: String
	},
	encoded_by: {
		type: String
	},
	color: {
		type: String
	},
	longitude: {
		type: String
	},
	latitude: {
		type: String
	},
	position: {
		type: String
	},
	creation_date: {
		type: Date
	},
	remarks: {
		type: String
	},
	volunteer_id: {
		type: String
	},
	is_printed: {
		type: String
	},
	is_received: {
		type: String
	},
	status: {
		type: String
	},
	receive_date: {
		type: Date,
		default: Date.now
	},

})

module.exports = mongoose.model("Voter", voterSchema);

