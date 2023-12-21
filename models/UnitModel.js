const mongoose = require("mongoose")

const unitSchema = mongoose.Schema({
    unitName:{
        type:String,
        required:true
    },
    unitSlug:{
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Unit', unitSchema)