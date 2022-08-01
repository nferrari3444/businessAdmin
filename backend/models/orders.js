const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;


const orderSchema = new mongoose.Schema({

    service: String,
    name: String,
    lastName: String,
    email: String,
    city: String,

    price: Number,
    date: Date,
    // transaction_id: {},
    user: { type: ObjectId, ref: "Customer" }

},
{timestamp: true}
)

module.exports = mongoose.model("Order", orderSchema)
