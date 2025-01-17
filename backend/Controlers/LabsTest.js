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

const getLabsById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params ", req.params);

    const labTest = await LabTestModel.findById(id); 
    console.log("labTest ", labTest);  

    if (!labTest) {
      return res.status(404).json({ message: 'Lab Test not found' }); 
    }

    return res.status(200).json(labTest); 
  } catch (error) {
    console.error('Error fetching lab test:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const labsCurrentUser = async (req, res) => {
  try {
    const { userId } = req; 
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const userLabTests = await LabTestModel.find({ createdBy: userId });
    if (userLabTests.length === 0) {
      return res.status(404).json({ message: "No Lab Tests found for this user" });
    }

    res.status(200).json(userLabTests);
  } catch (error) {
    console.error("Error fetching lab tests for current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = { createLabTest,  getAllLabTests,updateLabTest ,deleteLabTest,getLabsById,labsCurrentUser};

