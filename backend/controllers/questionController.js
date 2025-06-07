const Question = require("../models/questionModel");
const mongoose = require("mongoose");
// get all questions
const getQuestions = async (req, res) => {
  const questions = await Question.find({}).sort({ createdAt: -1 });
  res.status(200).json(questions);
};

// get a type of question
const getQuestionType = async (req, res) => {
  const { type } = req.params;

  try {
    // Find questions of the specified type
    const questions = await Question.find({ type: type });

    // If no questions are found, return a 404 error
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ error: `No questions found for type "${type}"` });
    }

    // Return the found questions with a 200 status code
    res.status(200).json(questions);
  } catch (error) {
    // Handle unexpected errors (e.g., database connection issues)
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getQuestions,
  getQuestionType,
};
