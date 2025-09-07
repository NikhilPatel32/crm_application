require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const app = express();

//making connection to database
connectToDB();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api/auth' , authRoutes);
app.get('/' , (req , res) => {
    res.json({
        message: 'CRM Application is running...'
    })
})

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
})

