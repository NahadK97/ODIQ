const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define the Questions schema
const questionSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Questions", questionSchema);
