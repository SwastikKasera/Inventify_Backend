const express = require('express')
const { createSale, fetchSale, fetchOneSale, deleteSale } = require('../controllers/saleController')
const auth = require('../middlewares/auth')
const saleRouter = express.Router()

saleRouter.post('/sale', auth, createSale)
saleRouter.get('/get/:companyId', auth, fetchSale)
saleRouter.get('/getone/:saleId', auth, fetchOneSale)
saleRouter.delete('/delete/:saleId', auth, deleteSale)

module.exports = saleRouter