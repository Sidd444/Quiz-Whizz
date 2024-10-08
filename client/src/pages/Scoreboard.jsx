import React, { useState, useEffect } from "react";
import axios from "axios";
import SERVER_URL from "../config";

const Scoreboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `${SERVER_URL}/api/scoreboard`
      );
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-5 text-white">Scoreboard</h2>
      {/* <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
                {users.map((user, index) => (
                    <li key={user._id} className="flex justify-between items-center mb-2">
                        <span>{index + 1}. {user.name}</span>
                        <span>{user.points} points</span>
                    </li>
                ))}
            </ul> */}
      <h1 className="text-white font-bold text-3xl mt-10">Coming Soon...</h1>
    </div>
  );
};

export default Scoreboard;
