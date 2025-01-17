const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  labName: {
    type: String,
    required: true,  
    trim: true,      
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true,  
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],  
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],  
    default: 'Active',
  },
}, {
  timestamps: true, 
});

const CreateNewLab = mongoose.model('createnewLab', labSchema);

module.exports = CreateNewLab;
