import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scoreboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:5000/api/scoreboard');
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-5">Scoreboard</h2>
            <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
                {users.map((user, index) => (
                    <li key={user._id} className="flex justify-between items-center mb-2">
                        <span>{index + 1}. {user.name}</span>
                        <span>{user.points} points</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scoreboard;
