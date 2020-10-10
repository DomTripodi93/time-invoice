const mongoose = require('mongoose');
const { Schema } = mongoose;

const clockItemModel = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: false },
        timeId: { type: String, required: true, unique: false },
        effect: { type: String, required: true, unique: false },
        time: { type: Date, required: true },
        timeFor: { type: String },
        hours: { type: Number},
        invoiced: { type: Boolean }
    }
);

clockItemModel.index({ userId: 1, timeId: 1, effect: 1 }, { unique: true });

module.exports = mongoose.model('Clock Item', clockItemModel);