// Dependencies and Modules for Audit Routes
const express = require("express");
const auditController = require("../controllers/audit");
const auth = require("../auth");
const { verify, verifyAdmin } = auth;

// Routing Component
const router = express.Router();

// GET ALL AUDIT TRAILS - Admin Access Only
router.get("/all", verify, verifyAdmin, auditController.getAllAudits);

// Export Route System
module.exports = router;
