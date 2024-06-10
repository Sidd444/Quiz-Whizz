import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const QuizList = () => {
    const { user } = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            const res = await axios.get('http://localhost:5000/api/quizzes');
            setQuizzes(res.data);
        };
        fetchQuizzes();
    }, []);

    const handleDelete = async (id) => {
        try {
            if(user.email==="siddharthabharaliassam@gmail.com"){
               await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
               setQuizzes(quizzes.filter(quiz => quiz._id !== id));
            }else alert("Only Admin can delete the quiz");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-5">Available Quizzes</h2>
            <ul className="w-full max-w-md">
                {quizzes.map(quiz => (
                    <li key={quiz._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{quiz.title}</span>
                            <span className="text-gray-600">Created by {quiz.createdByName}</span>
                            <div>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => navigate(`/quizzes/${quiz._id}`)}
                                >
                                    Take Quiz
                                </button>
                                
                                    <button
                                        className="bg-red-600 text-white px-4 py-2 rounded"
                                        onClick={() => handleDelete(quiz._id)}
                                    >
                                        Delete Quiz
                                    </button>
                               
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizList;
