import { useState } from "react";
import { useQuestionsContext } from "../hooks/useQuestionsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const AddQ = () => {
  const { dispatch } = useQuestionsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    question: "",
    answer: "",
    type: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(form),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      setForm({ question: "", answer: "", type: "" });
      dispatch({ type: "CREATE_QUESTION", payload: json });
    }
    navigate("/");
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Question</h3>

      <label htmlFor="question">Question:</label>
      <textarea
        id="question"
        value={form.question}
        onChange={handleChange}
        className={error && !form.question ? "error" : ""}
      />

      <label htmlFor="answer">Answer:</label>
      <textarea
        id="answer"
        value={form.answer}
        onChange={handleChange}
        className={error && !form.answer ? "error" : ""}
      />

      <label htmlFor="type">Type:</label>
      <select
        id="type"
        value={form.type}
        onChange={handleChange}
        className={error && !form.type ? "error" : ""}
      >
        <option value="">-- Select a topic --</option>
        <option value="OOPS">OOPS</option>
        <option value="DBMS">DBMS</option>
      </select>

      <button type="submit">Add Question</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddQ;
