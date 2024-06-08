import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newQuiz = { title, questions };
        try {
            await axios.post('http://localhost:5000/api/quizzes', newQuiz);
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
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <input
                    className="block w-full h-12 rounded-lg border-2 mb-5 px-3"
                    type="text"
                    placeholder="Enter Your Quiz Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                {questions.map((q, i) => (
                    <div key={i} className="mb-6">
                        <input
                            className="block w-full h-12 rounded-lg border-2 mb-2 px-3"
                            type="text"
                            placeholder="Enter The Question"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(i, 'question', e.target.value)}
                            required
                        />
                        {q.options.map((option, j) => (
                            <input
                                key={j}
                                className="block w-full h-10 rounded-lg border-2 mb-2 px-3"
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
                        <label className="block mb-2">Select the Correct Option</label>
                        <select
                            className="block w-full h-10 rounded-lg border-2 mb-4 px-3"
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
                <button type="button" onClick={addQuestion} className="bg-yellow-600 text-white px-4 py-2 rounded mr-2">
                    Add Question
                </button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Create Quiz
                </button>
            </form>
        </div>
    );
};

export default QuizForm;
