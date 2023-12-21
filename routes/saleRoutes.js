const express = require('express')
const { createSale, fetchSale, updateSale, deleteSale } = require('../controllers/saleController')

const saleRouter = express.Router()

saleRouter.post('/createSale', createSale)
saleRouter.get('/getSale', fetchSale)
saleRouter.put('/update/:saleId', updateSale)
saleRouter.delete('/deleteSale/:saleId', deleteSale)

module.exports = saleRouter