import { useEffect, useState } from "react";
import { useQuestionsContext } from "../hooks/useQuestionsContext";
import Card from "../components/Card";
import MultiFilter from "../components/MultiFilters";

const Home = () => {
  const { questions, dispatch } = useQuestionsContext();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/questions`
        );
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_QUESTIONS", payload: json });
          setFilteredQuestions(json);
        } else {
          console.error("Fetch error:", json.error || json.message);
        }
      } catch (err) {
        console.error("Network error:", err.message);
      }
    };

    fetchQuestions();
  }, [dispatch]);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const filtered = questions.filter((q) =>
        selectedFilters.includes(q.type)
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions(questions);
    }
  }, [selectedFilters, questions]);

  const getUniqueTypes = () => {
    if (!questions || questions.length === 0) return [];
    const types = questions.map((q) => q.type);
    return [...new Set(types)];
  };

  return (
    <div className="home">
      <MultiFilter
        filters={getUniqueTypes()}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="content">
        {filteredQuestions &&
          filteredQuestions.map((question, index) => (
            <Card key={index} question={question} index={index} />
          ))}
      </div>
    </div>
  );
};

export default Home;
