const LabTestModel = require("../Models/LabTestModel"); 

const createLabTest = async (req, res) => {
  try {
    const newLabTest = new LabTestModel(req.body);
    const savedLabTest = await newLabTest.save();
    res.status(201).json(savedLabTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllLabTests = async (req, res) => {
  try {
    const labTests = await LabTestModel.find();
    res.status(200).json(labTests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLabTest = async (req, res) => {
  try {
    const labTest = await LabTestModel.findById(req.params.id);
    if (!labTest) {
      return res.status(404).json({ message: 'Lab Test not found' });
    }

    const updatedLabTest = await LabTestModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLabTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLabTest = async (req, res) => {
  try {
    const labTest = await LabTestModel.findById(req.params.id);
    if (!labTest) {
      return res.status(404).json({ message: 'Lab Test not found' });
    }
    await LabTestModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Lab Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createLabTest,  getAllLabTests,updateLabTest ,deleteLabTest};

