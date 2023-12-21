const mongoose = require('mongoose');
const dateFormat = require('date-format');

var date = dateFormat('dd-MM-yyyy', new Date())
const purchaseSchema = mongoose.Schema({
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
    purchaseBillId: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: String,
        default: date
    },
    materialRecieveDate:{
        type: Date,
    },
    purchaseItemList:[{
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
    totalPurchasedItem:{
        type: Number
    },
    purchaseGrossAmount:{
        type: Number
    },
    purchaseCGSTAmount:{
        type: Number,
    },
    purchaseSGSTAmount:{
        type: Number,
    },
    purchaseNetAmount:{
        type:Number
    }
});

module.exports = mongoose.model('Purchase', purchaseSchema);