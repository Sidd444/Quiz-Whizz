import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import QuizForm from './components/QuizForm';
import QuizList from './components/QuizList';
import ViewQuiz from './components/ViewQuiz';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="create-quiz" element={<QuizForm />} />
                    <Route path="quizzes" element={<QuizList />} />
                    <Route path="quizzes/:id" element={<ViewQuiz />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
