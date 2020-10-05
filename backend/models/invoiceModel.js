const mongoose = require('mongoose');

const { Schema } = mongoose;

const invoiceModel = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
        invoiceNumber: { type: Number, required: true, unique: false },
        hours: { type: Number },
        invoiced: { type: Boolean }
    }
);

objectiveModel.index({ userId: 1, invoiceNumber: 1 }, { unique: true });

module.exports = mongoose.model('Invoice', invoiceModel);