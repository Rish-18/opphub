const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Scholarship', 'Internship', 'Fellowship', 'Competition', 'Grant', 'Workshop'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    eligibility: {
        type: String,
        required: [true, 'Eligibility is required']
    },
    organization: {
        type: String,
        required: [true, 'Organization name is required'],
        trim: true
    },
    location: {
        type: String,
        default: 'Not specified'
    },
    applicationLink: {
        type: String,
        required: [true, 'Application link is required']
    },
    deadline: {
        type: Date,
        required: [true, 'Deadline is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
