import { useEffect } from "react";
import { useQuestionsContext } from "../hooks/useQuestionsContext";

import Card from "../components/Card";
const Home = () => {
  const { questions, dispatch } = useQuestionsContext();
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/questions");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_QUESTIONS", payload: json });
      }
    };
    fetchQuestions();
  }, [dispatch]);
  return (
    <div className="home">
      <div className="content">
        {questions &&
          questions.map((question, index) => (
            <Card key={question.id} question={question} index={index} />
          ))}
      </div>
    </div>
  );
};

export default Home;
