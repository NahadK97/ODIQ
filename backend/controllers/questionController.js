const Question = require("../models/questionModel");
const mongoose = require("mongoose");
// get all questions
const getQuestions = async (req, res) => {
  const questions = await Question.find({}).sort({ createdAt: -1 });
  res.status(200).json(questions);
};
// get a single question
const getQuestion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such question" });
  }
  const question = await Question.findById(id);
  if (!question) {
    return res.status(404).json({ error: "No such question" });
  }
  res.status(200).json(question);
};
// create new question
const createQuestion = async (req, res) => {
  const { type, question, answer } = req.body;
  // add doc to db
  try {
    const que = await Question.create({ type, question, answer });
    res.status(200).json(que);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such question" });
  }
  const question = await Question.findByIdAndDelete(id);
  if (!question) {
    return res.status(404).json({ error: "No such question" });
  }
  res.status(200).json(question);
};
module.exports = {
  getQuestions,
  getQuestion,
  createQuestion,
  deleteQuestion,
};
