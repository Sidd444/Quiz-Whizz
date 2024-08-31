import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            navigate('/login');
        } catch (err) { 
            setError(err.response?.data?.message || 'Error signing up');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 rounded-lg backdrop-blur-sm shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border rounded"
                />
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
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Sign Up</button>
                <p className="mt-4 text-white">
                    Already have an account? <a href="/login" className="text-blue-500">Log in</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;
