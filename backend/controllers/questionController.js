const Question = require("../models/questionModel");
const mongoose = require("mongoose");
// get all questions
const getQuestions = async (req, res) => {
  const questions = await Question.find({}).sort({ createdAt: -1 });
  res.status(200).json(questions);
};

module.exports = {
  getQuestions,
};
