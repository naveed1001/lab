const mongoose = require('mongoose');

const BookAppointment = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        match: [/^([01]?\d|2[0-3]):[0-5]\d$/, 'Please use a valid time format (HH:MM).'],
    },
    message: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

const Bookappoint = mongoose.model('bookappoint',BookAppointment );

module.exports = Bookappoint;
