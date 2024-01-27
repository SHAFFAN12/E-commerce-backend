const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('vendor', vendorSchema);
