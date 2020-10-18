const mongoose = require('mongoose');

const { Schema } = mongoose;

const invoiceModel = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
        invoiceNumber: { type: Number, required: true, unique: false },
        customer: { type: String },
        dateRange: { type: String, required: true },
        date: { type: Date, required: true },
        hours: { type: Number },
        paid: { type: Boolean }
    }
);

invoiceModel.index({ userId: 1, invoiceNumber: 1 }, { unique: true });

module.exports = mongoose.model('Invoice', invoiceModel);