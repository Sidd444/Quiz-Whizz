import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen"  >
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border rounded"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
                <p className="mt-4 text-white">
                    Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
