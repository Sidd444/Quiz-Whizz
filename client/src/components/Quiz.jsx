import React, { useState } from "react";
import axios from "axios";

const Quiz = ({ quiz, onDelete }) => {
  const [answers, setAnswers] = useState(
    Array(quiz.questions.length).fill(null)
  );
  const [score, setScore] = useState(null);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://clownfish-app-7icys.ondigitalocean.app/api/quizzes/${quiz._id}/submit`,
        { answers }
      );
      setScore(res.data.score);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ml-96 mt-4 border p-4 rounded shadow-lg">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">{quiz.title}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, i) => (
          <div key={i} className="mb-4">
            <p className="font-semibold">{q.question}</p>
            {q.options.map((option, j) => (
              <label key={j} className="block">
                <input
                  type="radio"
                  name={`question-${i}`}
                  value={j}
                  onChange={(e) => handleAnswerChange(i, e.target.value)}
                  required
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
      {score !== null && (
        <p className="mt-4">
          Your score: {score}/{quiz.questions.length}
        </p>
      )}
    </div>
  );
};

export default Quiz;
