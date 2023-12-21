const express = require("express");
const { createCustomer, fetchCustomer, updateCustomer, deleteCustomer } = require("../controllers/customerController");
const { auth } = require("../auth/Auth");
const customerRouter = express.Router();

customerRouter.post('/createCustomer', auth, createCustomer)
customerRouter.get('/getAllCustomer',auth, fetchCustomer)
customerRouter.put('/updateCustomer/:customerId',auth,updateCustomer)
customerRouter.delete('/deleteCustomer/:customerId', auth,deleteCustomer)

module.exports = customerRouter