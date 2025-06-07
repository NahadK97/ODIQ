const express = require("express");
const {
  getQuestions,
  getQuestionType,
} = require("../controllers/questionController");

const router = express.Router();

// GET all Questions
router.get("/", getQuestions);

// Export the router
module.exports = router;
