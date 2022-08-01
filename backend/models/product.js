const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const serviceSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },

    description: {
        type: String,
        required: true,
        maxlength: 2000
    },

    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },

    category: {
        type: ObjectId, // When we refer to the product Category it will go to the category model. The type will be moongose.Schema
        ref: 'Category', // It refers to the category model. This is how we can work with relationship from one model to another.
        required: false,
        
    },

    // quantity: {
    //     type: Number
    // },

  
},

{timestamp: true}

);

module.exports = mongoose.model("Service", serviceSchema)
