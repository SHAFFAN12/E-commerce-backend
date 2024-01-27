const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    storeName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor', // Assuming you have a Vendor model
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    isApproved:{
        type:Boolean,
        default:false,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('product', productSchema);
