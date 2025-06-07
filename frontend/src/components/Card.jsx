import { useState } from "react";

const Card = ({ question, index }) => {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (id) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!question) return null;

  return (
    <div className="card-item">
      <div className="que">
        <h2>Question {index + 1}</h2>
        <p>{question.type}</p>
        <h3>{question.question}</h3>
      </div>
      <button onClick={() => toggleAnswer(question._id)}>
        {visibleAnswers[question._id] ? "Hide Answer" : "Show Answer"}
      </button>
      <div className="ans">
        {visibleAnswers[question._id] && <p>{question.answer}</p>}
      </div>
    </div>
  );
};

export default Card;
