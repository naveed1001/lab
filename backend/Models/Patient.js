const mongoose = require("mongoose");

const patientProfileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.'],
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: String,
      required: true,
      match: /^[0-9]{5}$/, 
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      validate: {
          validator: function(v) {
              return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
      }
  },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true } 
);

const PatientProfile = mongoose.model("PatientProfile", patientProfileSchema);

module.exports = PatientProfile;
