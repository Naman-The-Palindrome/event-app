// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import AuthForm from "../components/AuthForm";

function Login() {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const navigate = useNavigate(); 

  const handleSubmit = async (formData) => {
    try {
      const endpoint =
        mode === "login"
          ? "http://localhost:5000/api/auth/login"
          : "http://localhost:5000/api/auth/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      if (mode === "login") {
        // Save token and user in localStorage for later use
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Logged in successfully");

        // Redirect to myevents page
        navigate("/my-events");
      } else {
        alert("Signed up successfully! Now login.");
        setMode("login");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };


  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>

      {/* Toggle buttons for Login/Signup */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setMode("login")}
          className={`px-4 py-2 rounded-l ${
            mode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`px-4 py-2 rounded-r ${
            mode === "signup" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Pass mode and handleSubmit to AuthForm */}
      <AuthForm mode={mode} onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
