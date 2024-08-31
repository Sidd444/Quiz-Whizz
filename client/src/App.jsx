import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QuizForm from "./pages/QuizForm";
import QuizList from "./pages/QuizList";
import ViewQuiz from "./pages/ViewQuiz";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Scoreboard from "./pages/Scoreboard";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
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
            <Route path="scoreboard" element={<Scoreboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
