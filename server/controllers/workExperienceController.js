const WorkExperience = require("../models/WorkExperience");

const getWorkExperience = async (req, res) => {
  try {
    const experience = await WorkExperience.find().sort({ createdAt: -1 });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createWorkExperience = async (req, res) => {
  try {
    const entry = await WorkExperience.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateWorkExperience = async (req, res) => {
  try {
    const entry = await WorkExperience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!entry) {
      return res.status(404).json({ message: "Work experience entry not found" });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteWorkExperience = async (req, res) => {
  try {
    const entry = await WorkExperience.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Work experience entry not found" });
    }
    res.json({ message: "Work experience entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getWorkExperience,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
};