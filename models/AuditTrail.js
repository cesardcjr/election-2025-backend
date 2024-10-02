const mongoose = require("mongoose");

const auditTrailSchema = new mongoose.Schema({
    voter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voter',
        required: true
    },
    updated_by: {
        type: String,
        required: true
    },
    update_date: {
        type: Date,
        default: Date.now
    },
    changes: [{
        field: { type: String },
        old_value: { type: mongoose.Schema.Types.Mixed },
        new_value: { type: mongoose.Schema.Types.Mixed }
    }]
});

module.exports = mongoose.model("AuditTrail", auditTrailSchema);
