const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//generation of the token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    });
};

// Registration of the user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Checking if user exists or not
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json(
                { message: 'User already exists' }
            );
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); //hashing of the password

        // Creating user with hashed password
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json(
                { message: 'Invalid user data' }
            );
        }
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

// Login logic of the User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json(
                { message: 'Invalid email or password' }
            );
        }
    } catch (error) {
        res.status(500).json(
            { message: error.message }
        );
    }
};

module.exports = {
    registerUser,
    loginUser,
};
