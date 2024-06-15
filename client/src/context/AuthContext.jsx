import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("https://clownfish-app-7icys.ondigitalocean.app/api/users/me")
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      "https://clownfish-app-7icys.ondigitalocean.app/api/users/login",
      {
        email,
        password,
      }
    );
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    const userRes = await axios.get(
      "https://clownfish-app-7icys.ondigitalocean.app/api/users/me"
    );
    setUser(userRes.data);
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(
        "https://clownfish-app-7icys.ondigitalocean.app/api/users/signup",
        {
          name,
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.token}`;
      const userRes = await axios.get(
        "https://clownfish-app-7icys.ondigitalocean.app/api/users/me"
      );
      setUser(userRes.data);
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
