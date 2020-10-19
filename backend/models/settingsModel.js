const mongoose = require('mongoose');

const { Schema } = mongoose;

const settingsModel = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
        lastInvoiceNumber: { type: Number, required: true },
        defaultPointOfContact: { type: String, required: true  },
        defaultEmail: { type: String, required: true  },
        companyName: { type: String },
        address: { type: String },
        state: { type: String },
        county: { type: String },
        zipCode: { type: String },
        defaultPhone: { type: String }
    }
);

settingsModel.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('Settings', settingsModel);