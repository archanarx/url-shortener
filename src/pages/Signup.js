import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = () => {

    // empty field alert
        if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    } 

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if user already exists
    const exists = users.find(u => u.email === email);
    if (exists) {
        alert("User already exists");
        return;
    }

    // new user
    users.push({
      name,           
      email,
      password,
      urls: []
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup Successful");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-3">Signup</h3>

        {/* NAME */}
        <input
          className="form-control mb-3"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-pink w-100" onClick={signup}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
