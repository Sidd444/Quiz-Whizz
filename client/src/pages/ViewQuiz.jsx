import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Card";
import SERVER_URL from "../config";

const ViewQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(
        `${SERVER_URL}/api/quizzes/${id}`
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
        `${SERVER_URL}/api/quizzes/${id}/submit`,
        { answers }
      );
      setScore(res.data.score);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen text-white ">
      {quiz && (
        <div>
          <Card className="flex flex-col w-[300px] md:w-[400px] bg-gradient-to-r from-violet-700 via-red-500 to-pink-700">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>Created by {quiz.createdByName}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {quiz.questions.map((q, i) => (
                  <div key={i} className="mt-4">
                    <span className="font-semibold">
                      {i + 1}. {q.question}
                    </span>
                    <hr></hr>
                    <div>
                      <p>Select the correct option: </p>
                      <div>
                        {q.options.map((option, j) => (
                          <div className="flex items-center space-x-2" key={j}>
                            <input
                              id={`question-${i}-option-${j}`}
                              type="radio"
                              name={`question-${i}`}
                              required
                              value={j}
                              onChange={(e) =>
                                handleAnswerChange(i, e.target.value)
                              }
                              className="w-4 h-4 text-black bg-black"
                            />
                            <label htmlFor={`question-${i}-option-${j}`}>
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <Button className="bg-blue-500 text-white" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
              {score !== null && (
                <p className="mt-4 font-bold text-2xl text-center">
                  Your score: {score}/{quiz.questions.length}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ViewQuiz;
