const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerModel = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
        companyName: { type: String, required: true, unique: false },
        group: { type: String },
        pointOfContact: { type: String },
        address: { type: String },
        state: { type: String },
        zipCode: { type: String },
        defaultPhone: { type: String },
        defaultEmail: { type: String }
    }
);

customerModel.index({ userId: 1, companyName: 1 }, { unique: true });

module.exports = mongoose.model('Customer', customerModel);