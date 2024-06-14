import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewQuiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
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
            const res = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, { answers });
            setScore(res.data.score);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
            {quiz && (
                <>
                    <div className="flex justify-between mb-5 text-white">
                        <h2 className="text-2xl font-bold text-white">{quiz.title}</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {quiz.questions.map((q, i) => (
                            <div key={i} className="mb-4">
                                <p className="font-semibold text-white">{q.question}</p>
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
                                        <span className='text-white'>{option}</span>
                                    </label>
                                ))}
                            </div>
                        ))}
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
                    </form>
                    {score !== null && (
                        <p className="mt-4 text-white font-bold">Your score: {score}/{quiz.questions.length}</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ViewQuiz;
