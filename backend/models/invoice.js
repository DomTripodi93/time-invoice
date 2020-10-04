const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const InvoiceModel = new Schema(
    {
        userId: { type: String, required: true, unique: true },
        invoiceNumber: { type: Number},
        hours: { type: Number},
        invoiced: { type: Boolean }
    }
);

userModel.plugin(uniqueValidator);

module.exports = mongoose.model('Invoice', InvoiceModel);