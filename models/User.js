// User Model

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	mobileNo: {
		type: String
	},
	username: {
		type: String
	},
	password: {
		type: String
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
})

//Model
module.exports = mongoose.model("User",userSchema);