import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(
        `https://clownfish-app-7icys.ondigitalocean.app/api/quizzes/${id}`
      );
      setQuiz(res.data);
      setAnswers(Array(res.data.questions.length).fill(null));
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://clownfish-app-7icys.ondigitalocean.app/api/quizzes/${id}/submit`,
        { answers }
      );
      setScore(res.data.score);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" mx-auto mt-10 p-4 border rounded shadow text-white">
      {quiz && (
        <>
          <div className="mb-5">
            <h2 className="text-3xl font-bold text-center">{quiz.title}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {quiz.questions.map((q, i) => (
              <div
                key={i}
                className="mb-4 border-2 py-2 text-left px-10 rounded"
              >
                <p className="font-semibold text-xl">{q.question}</p>
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
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded mb-2 w-44 font-bold"
            >
              Submit
            </button>
          </form>
          {score !== null && (
            <p className="mt-4 font-bold text-2xl text-center">
              Your score: {score}/{quiz.questions.length}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ViewQuiz;
