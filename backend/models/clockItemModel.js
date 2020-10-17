const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const clockItemModel = new Schema(
    {
        date: { type: Date, required: true },
        userId: { type: String, required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date },
        customer: { type: String },
        invoiceNumber: { type: String },
        hours: { type: Number},
        invoiced: { type: Boolean }
    }
);

clockItemModel.plugin(uniqueValidator);

module.exports = mongoose.model('Clock Item', clockItemModel);
