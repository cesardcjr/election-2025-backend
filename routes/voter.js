//Dependencies and Modules ofr User Routes

const express = require("express");
const voterController = require("../controllers/voter");
const auth = require("../auth");
const { verify, verifyAdmin } = auth;
const Voter = require("../models/Voter");

//Routing Component
const router = express.Router();

//Retrieve All Voters
router.get("/all", voterController.getAllVoters);

//Search by Name
router.post("/search", voterController.searchVoterByName);

//Search by ID
router.get("/:voterId", voterController.searchVoterByID);

//Update Voter Details
router.put("/:voterId", verify, voterController.updateVoterDetails);


// Export Route System
module.exports = router;