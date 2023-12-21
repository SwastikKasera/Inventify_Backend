const mongoose = require('mongoose')

const serialSchema = mongoose.Schema({
    purchaseSerial: {
        type: Number,
        default: 0
    },
    saleSerial:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Serial', serialSchema)