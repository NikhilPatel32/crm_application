const express = require('express');
const {
    getLeads,
    createLead,
    updateLead,
    deleteLead,
    getDashboard
} = require('../controllers/leadController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// all routes reqquire authentication
router.use(auth);

router.get('/dashboard', getDashboard);
router.get('/customer/:customerId', getLeads);
router.post('/customer/:customerId', createLead);
router.put('/customer/:customerId/:leadId', updateLead);
router.delete('/customer/:customerId/:leadId', deleteLead);

module.exports = router;

