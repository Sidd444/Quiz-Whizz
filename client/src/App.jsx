import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import QuizForm from './components/QuizForm';
import QuizList from './components/QuizList';
import ViewQuiz from './components/ViewQuiz';
import Signup from './components/Signup';
import Login from './components/Login';
import AuthProvider, { AuthContext } from './context/AuthContext';
import Scoreboard from './components/Scoreboard';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
            <Navbar></Navbar>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Home />} />
                        <Route path="create-quiz" element={<QuizForm />} />
                        <Route path="quizzes" element={<QuizList />} />
                        <Route path="quizzes/:id" element={<ViewQuiz />} />
                        <Route path="scoreboard" element={<Scoreboard/>} />
                
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
