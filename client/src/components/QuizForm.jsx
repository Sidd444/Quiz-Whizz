import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Button } from "./Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Card";
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

      <div className="flex justify-center items-center">
        <Card className="w-auto bg-white text-black">
          <CardHeader className="text-center">
            <CardTitle>Create Quiz</CardTitle>
            <CardDescription>
              Create a new quiz and challenge others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="space-x-2">
                <input
                  type="text"
                  value={title}
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter the title of the quiz"
                  className="p-1 bg-transparent border border-black w-full"
                />
              </div>
              <hr />
              {questions.map((q, i) => (
                <div className="space-x-2" key={i}>
                  <label htmlFor="question">{i + 1}. Enter question:</label>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(i, "question", e.target.value)
                    }
                    id="question"
                    required
                    className="p-1 bg-transparent border border-black"
                  />
                  {q.options.map((option, j) => (
                    <div className="space-y-3 space-x-3">
                      <label htmlFor="option">Option {j + 1}:</label>
                      <input
                        type="text"
                        value={option}
                        id="option"
                        onChange={(e) => {
                          const newOptions = [...q.options];
                          newOptions[j] = e.target.value;
                          handleQuestionChange(i, "options", newOptions);
                        }}
                        required
                        className="p-1 bg-transparent border border-black"
                      />
                    </div>
                  ))}
                  <div className="space-x-2 mt-3">
                    <label htmlFor="title">Correct option:</label>
                    <select
                      className="p-1 rounded-xl bg-neutral-500 text-white text-center"
                      value={q.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(
                          i,
                          "correctAnswer",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option className="text-white" value={0}>
                        Option 1
                      </option>
                      <option className="text-white" value={1}>
                        Option 2
                      </option>
                      <option className="text-white" value={2}>
                        Option 3
                      </option>
                      <option className="text-white" value={3}>
                        Option 4
                      </option>
                    </select>
                  </div>
                </div>
              ))}
              <hr />
              <div className="flex justify-around items-center">
                <Button
                  onClick={addQuestion}
                  className="bg-blue-500 text-white rounded-md px-3 py-2 shadow-md"
                >
                  Add Question
                </Button>
                <Button
                  className="bg-green-500 text-white rounded-md px-3 py-2 shadow-md"
                  type="submit"
                >
                  Create Quiz
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizForm;
