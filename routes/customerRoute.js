const express = require('express')
const { createCustomer, fetchCustomer, updateCustomer, deleteCustomer, searchCustomer, fetchOneCustomer } = require('../controllers/customerController')
const auth = require('../middlewares/auth')

const customerRouter = express.Router()

customerRouter.post('/create',auth, createCustomer)
customerRouter.get('/get',auth, fetchCustomer)
customerRouter.get('/get/:customerId',auth, fetchOneCustomer)
customerRouter.put('/update/:customerId',auth, updateCustomer)
customerRouter.delete('/delete/:customerId',auth, deleteCustomer)
customerRouter.get('/search', auth, searchCustomer);

module.exports = customerRouter