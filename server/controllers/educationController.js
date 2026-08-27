const Education = require("../models/Education");

const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEducation = async (req, res) => {
  try {
    const entry = await Education.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEducation = async (req, res) => {
  try {
    const entry = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!entry) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const entry = await Education.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    res.json({ message: "Education entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };