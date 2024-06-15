import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Card";

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
    <div className="flex justify-center items-center h-screen">
      {quiz && (
        <div>
          <Card className="bg-white text-black flex flex-col w-[300px] md:w-[400px]">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>Created by {quiz.createdByName}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {quiz.questions.map((q, i) => (
                  <div key={i}>
                    <span className="font-semibold">
                      {i + 1}. {q.question}
                    </span>
                    <div>
                      <p>Select the correct option: </p>
                      <RadioGroup className="text-black">
                        {q.options.map((option, j) => (
                          <div className="flex items-center space-x-2">
                            <input
                              id={j}
                              type="radio"
                              required
                              value={j}
                              onChange={(e) =>
                                handleAnswerChange(i, e.target.value)
                              }
                              className="w-4 h-4 text-black bg-black"
                            />
                            <label htmlFor={j}>{option}</label>
                          </div>
                        ))}
                      </RadioGroup>
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
