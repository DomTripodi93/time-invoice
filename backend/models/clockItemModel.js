const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const clockItemModel = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
        timeId: { type: String, required: true, unique: false  },
        effect: { type: String, required: true },
        time: { type: Date, required: true },
        timeFor: { type: String },
        hours: { type: Number},
        invoiced: { type: Boolean }
    }
);

objectiveModel.index({ userId: 1, timeId: 1 }, { unique: true });

module.exports = mongoose.model('Clock Item', clockItemModel);