import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SERVER_URL from "../config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "./Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./Card";

const QuizList = () => {
  const { user } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await axios.get(
        `${SERVER_URL}/api/quizzes`
      );
      setQuizzes(res.data);
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (user.email === "siddharthabharaliassam@gmail.com") {
        await axios.delete(
          `${SERVER_URL}/api/quizzes/${id}`
        );
        setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      } else alert("Only Admin can delete the quiz");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-5 text-white">Available Quizzes</h2>
      <ul className="rounded-md flex justify-center gap-2 flex-col">
        {quizzes.map((quiz, i) => (
          <li key={i}>
            <Card className="bg-white w-[350px] md:w-[800px]">
              <CardHeader>
                <CardTitle>
                  {i + 1}. {quiz.title}
                </CardTitle>
                <CardDescription>
                  Created by {quiz.createdByName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around items-center">
                  <Button
                    onClick={() => navigate(`/quizzes/${quiz._id}`)}
                    className="bg-blue-500 text-white"
                  >
                    Take Quiz
                  </Button>
                  <Button
                    onClick={() => handleDelete(quiz._id)}
                    className="bg-red-500 text-white"
                  >
                    Delete Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
