import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from "react";
import Redirect from "./pages/Redirect";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} logout={logout} />

      <div className="container mt-4">
        <Routes>

          <Route
            path="/"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />

          {/* SHORT URL REDIRECT ROUTE */}
          <Route path="/:shortId" element={<Redirect />} />

        </Routes>
      </div>
    </>
  );
}

export default App;