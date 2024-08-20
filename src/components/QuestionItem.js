import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    onDelete(id);
  }

  function handleCorrectAnswerChange(event) {
    onUpdate(id, parseInt(event.target.value));
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <select value={correctIndex} onChange={handleCorrectAnswerChange}>
        {answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default QuestionItem;
