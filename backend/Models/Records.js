const mongoose = require("mongoose");

const savedRecordSchema = new mongoose.Schema(
    {
        type: { type: String, required: true }, 
        data: { type: Array, required: true },  
    },
    { timestamps: true }
);

const SavedRecord = mongoose.model("SavedRecord", savedRecordSchema);

module.exports = SavedRecord;

