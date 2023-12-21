const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    customerName:{
        type: String,
        required: true,
    },
    customerAddress:{
        type:String,
        required:true
    },
    customerEmail:{
        type:String,
    },
    customerMobile:{
        type:String,
        required:true
    },
    customerGSTIN:{
        type:String
    }
})

module.exports = mongoose.model('Customer', customerSchema)