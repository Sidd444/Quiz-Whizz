import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import SERVER_URL from "../config";
import { Button } from "../components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { AuthContext } from "../context/AuthContext";

const QuizForm = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);
  const [createdByName, setCreatorName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    if (isNameSet) {
      const newQuiz = { title, questions, createdByName };
      axios
        .post(
          `${SERVER_URL}/api/quizzes`,
          newQuiz,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(() => {
          alert("Quiz created successfully by " + createdByName);
          // Reset form state after successful submission
          setTitle("");
          setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: 0 }]);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsNameSet(false);
        });
    }
  }, [createdByName, isNameSet, user.token]);

  const setNameFunc = () => {
    setCreatorName(user.name);
    setIsNameSet(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameFunc();
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  return (
    <div>
      <p className="font-bold text-white text-center text-3xl mb-10">
        Create Your Own Quiz
      </p>
  
      <div className="flex justify-center items-center">
        <div className="w-full bg-opacity-50 backdrop-blur-md font-semibold text-white p-6 rounded-lg shadow-lg bg-gradient-to-r from-violet-700 via-red-500 to-pink-700">
          <div className="text-center mb-4 ">
            <h2 className="text-2xl font-bold">Create Quiz</h2>
            <p>Create a new quiz and challenge others</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={title}
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter the title of the quiz"
                className="p-2 bg-transparent border border-white w-full rounded"
              />
            </div>
            <hr className="border-white" />
            {questions.map((q, i) => (
              <div key={i}>
                <label htmlFor={`question-${i}`} className="block mb-2">
                  {i + 1}. Enter question:
                </label>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(i, "question", e.target.value)
                  }
                  id={`question-${i}`}
                  required
                  className="p-2 bg-transparent border border-white w-full rounded mb-4"
                />
                {q.options.map((option, j) => (
                  <div key={j} className="mb-2">
                    <label htmlFor={`option-${i}-${j}`} className="block mb-2">
                      Option {j + 1}:
                    </label>
                    <input
                      type="text"
                      value={option}
                      id={`option-${i}-${j}`}
                      onChange={(e) => {
                        const newOptions = [...q.options];
                        newOptions[j] = e.target.value;
                        handleQuestionChange(i, "options", newOptions);
                      }}
                      required
                      className="p-2 bg-transparent border border-white w-full rounded"
                    />
                  </div>
                ))}
                <div className="mt-4">
                  <label htmlFor={`correctAnswer-${i}`} className="block mb-2">
                    Correct option:
                  </label>
                  <select
                    className="p-2 bg-neutral-500 text-white rounded-md w-full"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleQuestionChange(
                        i,
                        "correctAnswer",
                        parseInt(e.target.value)
                      )
                    }
                    id={`correctAnswer-${i}`}
                  >
                    <option value={0}>Option 1</option>
                    <option value={1}>Option 2</option>
                    <option value={2}>Option 3</option>
                    <option value={3}>Option 4</option>
                  </select>
                </div>
              </div>
            ))}
            <hr className="border-white" />
            <div className="flex justify-around items-center mt-6">
              <button
                onClick={addQuestion}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 shadow-lg w-60 font-semibold h-12 text-xl"
              >
                Add Question
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 shadow-lg w-60 font-semibold h-12 text-xl"
              >
                Create Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default QuizForm;
