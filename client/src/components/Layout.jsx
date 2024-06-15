import React from "react";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "./Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="">
      <nav className="bg-gray-800 p-4">
        <ul className="flex justify-between font-bold text-2xl items-center">
          <li>
            <NavLink to="/" className="text-white" activeClassName="font-bold">
              Home
            </NavLink>
          </li>

          <li className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-white">
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-auto">
                <DropdownMenuGroup className="bg-neutral-300">
                  <DropdownMenuItem>
                    <NavLink to={"/create-quiz"} className={"text-black"}>
                      Create Quiz
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <NavLink to={"/quizzes"} className={"text-black"}>
                      Quiz List
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <NavLink to={"/scoreboard"} className={"text-black"}>
                      Scoreboard
                    </NavLink>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>

          <li className="hidden md:block">
            <NavLink
              to="/create-quiz"
              className="text-white"
              activeClassName="font-bold"
            >
              Create Quiz
            </NavLink>
          </li>
          <li className="hidden md:block">
            <NavLink
              to="/quizzes"
              className="text-white"
              activeClassName="font-bold"
            >
              Quiz List
            </NavLink>
          </li>
          <li className="hidden md:block">
            <NavLink
              to="/scoreboard"
              className="text-white"
              activeClassName="font-bold"
            >
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
