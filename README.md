# Mini CRM Application

A Customer Relationship Management (CRM) application built with the MERN stack for managing customers and their sales leads.

## Live Demo

- **Demo Link**: [https://crm-application-ukzr.vercel.app/]

## Features

- User authentication (Register/Login)
- Customer management (Add, Edit, Delete, View)
- Lead management for each customer
- Dashboard with statistics and charts
- Search and filter functionality
- Responsive design for mobile and desktop

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Chart.js
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Project Structure
```
CRM_APP/
├── backend/
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── customerController.js
│ │ └── leadController.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Customer.js
│ │ └── Lead.js
│ ├── routes/
│ │ ├── auth.js
│ │ ├── customers.js
│ │ └── leads.js
│ ├── middleware/auth.js
│ └── server.js
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.js
└── package.json
```


## Installation & Setup

### Prerequisites
- Node.js
- MongoDB Atlas account
- Git

### Backend Setup

1. **Clone and navigate**
git clone <repository-url>
cd CRM_APP/backend

2. **Install dependencies**
npm install

3. **Environment variables**
Create `.env` file:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000

4. **Start server**
npm run dev

### Frontend Setup

1. **Navigate and install**
cd ../frontend
npm install

2. **Update API URL**
In `src/services/config.js`:
export const API_URL = "http://localhost:3000/api";

3. **Start application**
npm run dev

Visit `http://localhost:3000`

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer
- `GET /api/customers/:id` - Get customer details
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Leads
- `GET /api/leads/dashboard` - Dashboard statistics
- `GET /api/leads/customer/:customerId` - Get customer leads
- `POST /api/leads/customer/:customerId` - Create lead
- `PUT /api/leads/customer/:customerId/:leadId` - Update lead
- `DELETE /api/leads/customer/:customerId/:leadId` - Delete lead
---
