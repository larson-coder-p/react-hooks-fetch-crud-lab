import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"; // Create this component for displaying individual questions

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // Fetch questions on component load
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Handle adding a new question
  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => setQuestions([...questions, data]))
      .catch((error) => console.error("Error adding question:", error));
  }

  // Handle deleting a question
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => setQuestions(questions.filter((question) => question.id !== id)))
      .catch((error) => console.error("Error deleting question:", error));
  }

  // Handle updating a question's correct answer
  function handleUpdateQuestion(id, updatedCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) =>
          question.id === updatedQuestion.id ? updatedQuestion : question
        );
        setQuestions(updatedQuestions);
      })
      .catch((error) => console.error("Error updating question:", error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion}
            onUpdate={handleUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
