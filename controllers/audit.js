const AuditTrail = require("../models/AuditTrail");

// GET ALL AUDIT TRAILS
module.exports.getAllAudits = (req, res) => {
    AuditTrail.find({})
        .populate('voter_id', 'fullname precint_number') // Populate voter details (optional)
        .then(auditTrails => {
            if (!auditTrails.length) {
                return res.status(404).send({
                    success: false,
                    message: 'No audit trails found'
                });
            }
            return res.send({
                success: true,
                auditTrails: auditTrails
            });
        })
        .catch(err => {
            console.error('Error fetching audit trails:', err);
            res.status(500).send({
                success: false,
                message: 'Internal server error',
                error: err.message
            });
        });
};
