import { useState } from "react";

const Card = () => {
  const qbank = [
    {
      id: 1,
      question: "What are the principles of OOP?",
      answer:
        "The principles of OOP are encapsulation, inheritance, polymorphism, and abstraction.",
    },
    {
      id: 2,
      question: "What is the lowest normal form in database design?",
      answer:
        "The lowest normal form in database design is the First Normal Form (1NF).",
    },
    {
      id: 3,
      question: "What is the purpose of a constructor in a class?",
      answer:
        "A constructor is a special method used to initialize objects of a class.",
    },
    {
      id: 4,
      question:
        "What is the difference between an interface and an abstract class?",
      answer:
        "An interface defines a contract that classes must implement, while an abstract class can provide some implementation and cannot be instantiated.",
    },
  ];

  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (id) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle visibility
    }));
  };

  return (
    <div className="card">
      {qbank.map((item, index) => (
        <div key={item.id} className="card-item">
          <div className="que">
            <h2>Question {index + 1}</h2>
            <h3>{item.question}</h3>
          </div>
          <button onClick={() => toggleAnswer(item.id)}>
            {visibleAnswers[item.id] ? "Hide Answer" : "Show Answer"}
          </button>
          <div className="ans">
            {visibleAnswers[item.id] && <p>{item.answer}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
