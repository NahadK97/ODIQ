import { useState } from "react";
import { useQuestionsContext } from "../hooks/useQuestionsContext";

const Card = ({ question, index }) => {
  const { dispatch } = useQuestionsContext();
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (id) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClick = async () => {
    const response = await fetch("/api/questions/" + question._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_QUESTION", payload: json });
    } else {
      console.error("Error deleting workout:", json);
    }
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

      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default Card;
