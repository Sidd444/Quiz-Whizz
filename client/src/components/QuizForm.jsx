import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const QuizForm = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newQuiz = { title, questions };
        try {
            await axios.post('http://localhost:5000/api/quizzes', newQuiz, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            alert('Quiz created successfully');
        } catch (err) {
            console.error(err);
        }
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="block w-80 h-12 rounded-2xl ml-96 border-2 mt-5 mb-5"
                type="text"
                placeholder="Enter Your Quiz Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            {questions.map((q, i) => (
                <div key={i}>
                    <input
                        className="block w-96 rounded-2xl ml-96 border-2 mt-5 mb-5"
                        type="text"
                        placeholder="Enter The Question"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(i, 'question', e.target.value)}
                        required
                    />
                    {q.options.map((option, j) => (
                        <input
                            className="rounded-xl h-10 m-10"
                            key={j}
                            type="text"
                            placeholder={`Option ${j + 1}`}
                            value={option}
                            onChange={(e) => {
                                const newOptions = [...q.options];
                                newOptions[j] = e.target.value;
                                handleQuestionChange(i, 'options', newOptions);
                            }}
                            required
                        />
                    ))}
                    <p className="ml-96 mt-5">Enter The Correct Option</p>
                    <select
                        className="ml-96 mb-5"
                        value={q.correctAnswer}
                        onChange={(e) => handleQuestionChange(i, 'correctAnswer', parseInt(e.target.value))}
                    >
                        <option value={0}>Option 1</option>
                        <option value={1}>Option 2</option>
                        <option value={2}>Option 3</option>
                        <option value={3}>Option 4</option>
                    </select>
                </div>
            ))}
            <button className='ml-96 bg-yellow-600 text-white' type="button" onClick={addQuestion}>Add Question</button>
            <button className='bg-green-600 text-white ml-20' type="submit">Create Quiz</button>
        </form>
    );
};

export default QuizForm;
