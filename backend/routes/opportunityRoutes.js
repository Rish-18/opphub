const express = require('express');
const router = express.Router();
const {
    getOpportunities,
    getOpportunityById,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity
} = require('../controllers/opportunityController');

// GET /api/opportunities
router.get('/', getOpportunities);

// GET /api/opportunities/:id
router.get('/:id', getOpportunityById);

// POST /api/opportunities (Admin)
router.post('/', createOpportunity);

// PUT /api/opportunities/:id (Admin)
router.put('/:id', updateOpportunity);

// DELETE /api/opportunities/:id (Admin)
router.delete('/:id', deleteOpportunity);

module.exports = router;
