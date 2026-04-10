const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    opportunityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity',
        required: [true, 'Opportunity ID is required']
    },
    status: {
        type: String,
        enum: ['Applied', 'Under Review', 'Accepted', 'Rejected'],
        default: 'Applied'
    },
    appliedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', applicationSchema);
