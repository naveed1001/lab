const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabTestSchema = new Schema({
    testName: {
        type: String,
        required: true,
    },
    testCode: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
}, {
    timestamps: true,
});

const LabTestModel = mongoose.model('LabTest', LabTestSchema);
module.exports = LabTestModel;
