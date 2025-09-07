const Customer = require('../models/Customer');
const Lead = require('../models/Lead');

// Get whole list of customers
const getCustomers = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 10;
        const search = req.query.search || '';

        let query = { ownerId: req.user._id };
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const customers = await Customer.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Customer.countDocuments(query);

        res.json({
            customers,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single customer
const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        
        if (!customer) {
            return res.status(404).json(
                { message: 'Customer not found' }
            );
        }

        const leads = await Lead.find(
            { customerId: customer._id }
        );

        res.json(
            { customer, leads }
        );
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

// Creation of the customer
const createCustomer = async (req, res) => {
    try {
        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            company: req.body.company,
            ownerId: req.user._id
        });

        const savedCustomer = await customer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the customer
const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        
        if (!customer) {
            return res.status(404).json(
                { message: 'Customer not found' }
            );
        }

        customer.name = req.body.name || customer.name;
        customer.email = req.body.email || customer.email;
        customer.phone = req.body.phone || customer.phone;
        customer.company = req.body.company || customer.company;

        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

// Deletion of the customer
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        
        if (!customer) {
            return res.status(404).json(
                { message: 'Customer not found' }
            );
        }

        await Customer.findByIdAndDelete(req.params.id);
        await Lead.deleteMany({ customerId: req.params.id });
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
