const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    
    email: {
        type: String,
        trim: true,
        required: true,
        unique: 32,
    },

    phoneNumber: {
        type: String,
        trim: true,
        required: true,
        maxlength:32
    },

    
    country: {
        type: String,
        trim: true,
        required: true,
        maxlength:32
    },

    city: {
        type: String,
        trim: true,
        required: true,
        maxlength:32
    },

    history: {
        type: Array,
        default: []
    }
},

{timestamp: true}

);

module.exports = mongoose.model("Customer", customerSchema)
