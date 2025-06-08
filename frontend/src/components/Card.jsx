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
        <h3>{question.question}</h3>
      </div>
      <div className="card-footer">
        <button onClick={() => toggleAnswer(question._id)}>
          {visibleAnswers[question._id] ? "Hide Answer" : "Show Answer"}
        </button>
        <p>{question.type}</p>
      </div>

      <div className="ans">
        {visibleAnswers[question._id] && <p>{question.answer}</p>}
      </div>

      <span>delete</span>
    </div>
  );
};

export default Card;
