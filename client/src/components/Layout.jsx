import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className=''>
            <nav className="bg-gray-800 p-4">
                <ul className="flex justify-between gap-60 font-bold text-2xl">
                    <li>
                        <NavLink to="/" className="text-white" activeClassName="font-bold">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create-quiz" className="text-white" activeClassName="font-bold">
                            Create Quiz
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/quizzes" className="text-white" activeClassName="font-bold">
                            Quiz List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/scoreboard" className="text-white" activeClassName="font-bold" >
                            ScoreBoard
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="container mx-auto p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
