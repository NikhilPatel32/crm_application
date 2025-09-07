const express = require('express');
const {
    getLeads,
    createLead,
    updateLead,
    deleteLead,
    getDashboardData
} = require('../controllers/leadController');
const auth = require('../middleware/auth');
const router = express.Router();

// All routes require authentication
router.use(auth);

// Dashboard route
router.get('/dashboard', getDashboardData);

// Lead routes
router.get('/customer/:customerId', getLeads);
router.post('/customer/:customerId', createLead);
router.put('/customer/:customerId/:leadId', updateLead);
router.delete('/customer/:customerId/:leadId', deleteLead);

module.exports = router;
