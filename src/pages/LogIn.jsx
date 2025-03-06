import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = async (event) => {
    event.preventDefault();
    const data = { email, password };

    try {
      const response = await fetch("https://vica.website/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log("Login Response:", res);

      if (response.ok && res.token) {
        localStorage.setItem("token", `Bearer ${res.token}`);
        navigate("/dashboard");
      } else {
        alert(res.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="auth">
        <div className="text">
          <h1>Sign In</h1>
          <p>Please enter your email and password to continue</p>
        </div>
        <form onSubmit={sendData}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="space">
              Sign In
            </button>
          </div>
        </form>
        <p>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
