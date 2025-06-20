import { useState } from "react";
import { useQuestionsContext } from "../hooks/useQuestionsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Card = ({ question, index }) => {
  const { dispatch } = useQuestionsContext();
  const { user } = useAuthContext();
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (id) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/questions` + question._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
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
      {user && (
        <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span>
      )}
    </div>
  );
};

export default Card;
