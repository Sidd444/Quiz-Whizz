import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
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
          "https://clownfish-app-7icys.ondigitalocean.app/api/quizzes",
          newQuiz,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(() => {
          alert("Quiz created successfully by" + createdByName);
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
      <form className="py-3" onSubmit={handleSubmit}>
        <input
          className="block w-96 h-12 rounded-2xl border-2 mt-5 mb-5 px-2"
          type="text"
          style={{ marginLeft: "35%" }}
          placeholder="Enter Your Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {questions.map((q, i) => (
          <div key={i}>
            <input
              className="block w-96 rounded-2xl h-10 border-2 mt-5 mb-5 px-2"
              style={{ marginLeft: "35%" }}
              type="text"
              placeholder="Enter The Question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(i, "question", e.target.value)
              }
              required
            />
            {q.options.map((option, j) => (
              <input
                className="rounded-xl h-10 m-5 w-96 px-2"
                key={j}
                type="text"
                placeholder={`Option ${j + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...q.options];
                  newOptions[j] = e.target.value;
                  handleQuestionChange(i, "options", newOptions);
                }}
                required
              />
            ))}
            <p className="mt-5 text-white font-bold mb-3">
              Enter The Correct Option
            </p>
            <select
              className="mb-5 rounded-xl bg-green-500 text-white font-bold"
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(
                  i,
                  "correctAnswer",
                  parseInt(e.target.value)
                )
              }
            >
              <option className="font-bold text-white" value={0}>
                Option 1
              </option>
              <option className="font-bold text-white" value={1}>
                Option 2
              </option>
              <option className="font-bold text-white" value={2}>
                Option 3
              </option>
              <option className="font-bold text-white" value={3}>
                Option 4
              </option>
            </select>
          </div>
        ))}
        <button
          className="w-60 font-bold bg-yellow-600 text-white h-10 px-2 rounded-xl"
          type="button"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          className="w-60 font-bold bg-green-600 text-white ml-20 h-10 px-2 rounded-xl"
          type="submit"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
