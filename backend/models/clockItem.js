const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const clockItemModel = new Schema(
    {
        userId: { type: String, required: true, unique: true },
        timeId: { type: String },
        effect: { type: String, required: true },
        timeFor: { type: String },
        time: { type: Date, required: true },
        hours: { type: Number},
        invoiced: { type: Boolean }
    }
);

userModel.plugin(uniqueValidator);

module.exports = mongoose.model('Clock Item', clockItemModel);