const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    resetToken: { 
        type: String, 
        default: null 
    },
    resetTokenExpiry: { 
        type: Date, 
        default: null 
    },

    firstName: String,
    lastName: String,
    practiceName: String,
    phone: String,
    streetAddress: String,
    city: String,
    state: String,
    zip: String,
    username: { 
        type: String, 
        unique: true,
        required: false 
    },
    assignRoles: [String], 
    status: { 
        type: String, 
        enum: ['Active', 'Inactive'], 
        default: 'Active' 
    },
    
}, {
    timestamps: true, 
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
