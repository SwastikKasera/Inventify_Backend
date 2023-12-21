const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },

    itemName:{
        type:String,
        required: true
    },
    itemHSNcode:{
        type: String,
        required:true,
        unique: true
    },
    itemTax:{
        type: Number,
        required:true
    },
    itemCGST:{
        type: Number,
    },
    itemSGST:{
        type: Number,
    },
    itemSlug:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Items', itemSchema);