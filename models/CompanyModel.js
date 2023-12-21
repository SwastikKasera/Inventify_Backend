const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    companyState: {
        type: String,
        required: true
    },
    companyPincode:{
        type: Number,
    },
    companyPan:{
        type: String
    },
    companyGSTIN: {
        type: String,
        required: true,
        unique: true
    },
    companyMobile: {
        type: Number,
        required: true,
    },
    companyEmail: {
        type: String,
        required: true,
    },
    companyBankName: {
        type: String,
        required: true
    },
    companyBankAddress: {
        type: String,
        required: true
    },
    companyBankAccount: {
        type: Number,
        required: true,
        
    },
    companyBankIFSC: {
        type: String,
        required: true,
        
    },
    companyPassword:{
        type: String,
        required: true
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    companyMark:{
        type: String,
    },
    purchaseNumber:{
        type: Number,
        default:0
    },
    saleNumber:{
        type: Number,
        default: 0
    }
    
});

module.exports = mongoose.model('Company', companySchema);