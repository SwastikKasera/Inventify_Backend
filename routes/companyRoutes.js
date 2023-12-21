const express = require('express');
const { createCompany, fetchCompany } = require('../controllers/companyController');
const { companyLogin, companySignup } = require('../controllers/companyLogin'); // Import the companyLogin controller
const auth = require('../middlewares/auth'); // Import the auth middleware
const companyRouter = express.Router();

// Public route: Company registration
companyRouter.post('/createCompany', createCompany);
companyRouter.get('/get/:companyId', auth, fetchCompany)
companyRouter.post('/signup', companySignup)

companyRouter.post('/login', companyLogin);


module.exports = companyRouter;
