const Lead = require('../models/Lead');
const Customer = require('../models/Customer');

// Get leads for a customer
const getLeads = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const status = req.query.status;

        let query = { customerId: customerId };
        if (status) {
            query.status = status;
        }

        const leads = await Lead.find(query).sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

// Creation of a  new lead
const createLead = async (req, res) => {
    try {
        const lead = new Lead({
            customerId: req.params.customerId,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || 'New',
            value: req.body.value
        });

        const savedLead = await lead.save();
        res.status(201).json(savedLead);
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

// Update lead
const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.leadId);
        
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        lead.title = req.body.title || lead.title;
        lead.description = req.body.description || lead.description;
        lead.status = req.body.status || lead.status;
        lead.value = req.body.value || lead.value;

        const updatedLead = await lead.save();
        res.json(updatedLead);
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

// Deletion of a lead
const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.leadId);
        
        if (!lead) {
            return res.status(404).json(
                { message: 'Lead not found' }
            );
        }

        await Lead.findByIdAndDelete(req.params.leadId);
        res.json({ message: 'Lead deleted' });
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

// Dashboard data
const getDashboard = async (req, res) => {
    try {
        const customers = await Customer.find({ ownerId: req.user._id });
        const customerIds = customers.map(c => c._id);
        const leads = await Lead.find({ customerId: { $in: customerIds } });

        const stats = {
            totalCustomers: customers.length,
            totalLeads: leads.length,
            totalValue: leads.reduce((sum, lead) => sum + lead.value, 0)
        };

        const statusCount = {};
        leads.forEach(lead => {
            statusCount[lead.status] = (statusCount[lead.status] || 0) + 1;
        });

        res.json({
            stats,
            statusCount,
            recentLeads: leads.slice(0, 5)
        });
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

module.exports = {
    getLeads,
    createLead,
    updateLead,
    deleteLead,
    getDashboard
};
