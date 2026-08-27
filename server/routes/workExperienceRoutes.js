const express = require("express");
const router = express.Router();
const {
  getWorkExperience,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} = require("../controllers/workExperienceController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getWorkExperience);
router.post("/", protect, createWorkExperience);
router.put("/:id", protect, updateWorkExperience);
router.delete("/:id", protect, deleteWorkExperience);

module.exports = router;