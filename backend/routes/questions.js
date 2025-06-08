const express = require("express");
const {
  getQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const router = express.Router();

// GET all Questions
router.get("/", getQuestions);

// GET a single Question by ID
router.get("/:id", getQuestion);

// POST a new Question
router.post("/", createQuestion);

// DELETE a Question by ID
router.delete("/:id", deleteQuestion);

// Export the router
module.exports = router;
