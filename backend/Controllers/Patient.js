const PatientModel = require('../Models/Patient');
const mongoose = require('mongoose');

const CreatePatientProfile = async (req, res) => {
  try {
    const createPatient = new PatientModel(req.body);
    const savedPatient = await createPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getAll = async (req, res) => {
  try {
    const allPatients = await PatientModel.find();
    res.status(200).json(allPatients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



const UpdatePatient = async (req, res) => {
  try {
    const UpdateData = await PatientModel.findById(req.params.id);
    if (!UpdateData) {
      return res.status(404).json({ message: 'Patient Test not found' });
    }

    const UpdateTest = await PatientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(UpdateTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deletePatient = async (req, res) => {
  try {
    const deleteRecords = PatientModel.findById(req.params.id);
    if (!deleteRecords) {
      return res.status(404).json({ message: 'Patient Test not found' });

    }
    await PatientModel.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Patient Test Delete Successfully" })
  } catch (error) {

  }
}


const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params ", req.params)

    const user = await PatientModel.findById(id);
    console.log("user ", user);
    if (!user) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const PatientCurrentUser = async (req, res) => {
  try {
    const { userId } = req; 
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const currentUser = await PatientModel.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(currentUser);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { CreatePatientProfile, getAll, UpdatePatient, deletePatient, getPatientById, PatientCurrentUser};
