const express = require('express')
const { createPurchase, fetchPurchase, fetchOnePurchase, deletePurchase } = require('../controllers/purchaseController')
const auth = require('../middlewares/auth')
const purchaseRouter = express.Router()

purchaseRouter.post('/purchase', auth, createPurchase)
purchaseRouter.get('/get/:companyId', auth, fetchPurchase)
purchaseRouter.get('/getone/:purchaseId', auth, fetchOnePurchase)
purchaseRouter.delete('/delete/:purchaseId', auth, deletePurchase)

module.exports = purchaseRouter