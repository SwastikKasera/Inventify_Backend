const mongoose = require('mongoose');
const dateFormat = require('date-format');

var date = dateFormat('dd-MM-yyyy', new Date())
const saleSchema = mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    paymentMode:{
        type: String,
        required: true
    },
    saleBillId: {
        type: String,
        required: true
    },
    saleDate: {
        type: String,
        default: date
    },
    saleItemList:[{
        itemId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Item'
        },
        itemQuantity:{
            type: Number,
        },
        itemRate:{
            type: Number,
        },
        itemUnit:{
            type: String
        },
        itemTotalAmount:{
            type: Number
        }
    }],
    totalSaledItem:{
        type: Number
    },
    saleGrossAmount:{
        type: Number
    },
    saleCGSTAmount:{
        type: Number,
    },
    saleSGSTAmount:{
        type: Number,
    },
    saleNetAmount:{
        type:Number
    }
});

module.exports = mongoose.model('Sale', saleSchema);