const Lab = require('../Models/CreateNewLab');

// Create a new lab
const createnewLab = async (req, res) => {
    try {
        const { labName, location, email, status } = req.body;

        if (!labName || !location || !email) {
            return res.status(400).json({ message: 'Lab name, location, and email are required.' });
        }

        const newLab = new Lab({ labName, location, email, status });

        await newLab.save();
        res.status(201).json(newLab);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getnewAllLabs = async (req, res) => {
    try {
        const labs = await Lab.find();
        res.status(200).json(labs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getnewLabById = async (req, res) => {
    try {
        const lab = await Lab.findById(req.params.id);

        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }

        res.status(200).json(lab);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a lab by ID
const updatenewLabById = async (req, res) => {
    try {
        const { labName, location, email, status } = req.body;

        const lab = await Lab.findByIdAndUpdate(
            req.params.id,
            { labName, location, email, status },
            { new: true }
        );

        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }

        res.status(200).json(lab);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a lab by ID
const deletenewLabById = async (req, res) => {
    try {
        const lab = await Lab.findByIdAndDelete(req.params.id);

        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }

        res.status(200).json({ message: 'Lab deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createnewLab,
    getnewAllLabs,
    getnewLabById,
    updatenewLabById,
    deletenewLabById,
};
