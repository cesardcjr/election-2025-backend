//Voters Model

const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({

	precint_number: {
		type: String
	},
	clustered_precint: {
		type: String
	},
	fullname:{
		type: String
	},
	address: {
		type: String
	},
	birthday:{
		type: Date
	},
	contact_number:{
		type: String
	},
	category:{
		type: String
	},
	barangay: {
		type: String
	},
	referred_by:{
		type: String
	},
	update_date:{
		type: Date
	},
	encoded_by:{
		type: String
	},
	color:{
		type: String
	},
	longitude: {
		type: String
	},
	latitude: {
		type: String
	}

})

module.exports = mongoose.model("Voter", voterSchema);

