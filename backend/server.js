require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const customer = require('./routes/customer');
const lead = require('./routes/lead');
const app = express();

//making connection to database
connectToDB();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",           
    "https://crm-application-sigma.vercel.app/" 
  ],
  credentials: true
}));

const PORT = process.env.PORT || 3000;

app.use('/api/auth' , authRoutes);
app.use('/api/customers' , customer);
app.use('/api/leads' , lead);

app.get('/' , (req , res) => {
    res.json({
        message: 'CRM Application is running...'
    })
})

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT}`);
})

