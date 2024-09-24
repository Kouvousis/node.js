const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
    product: {
        type: String,
        required: [true, "Product name is required"],
        max: 100,
        lowercase: true,
        trim: true
    },
    cost: {
        type: Number
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        max: 100,
        lowercase: true
    },
    quantity: {
        type: Number,
        required: true
    }
},
{
    collection: 'products',
    timestamps: true
}
)

module.exports = mongoose.model('Product', productSchema)