// src/components/AuthForm.jsx
import { useState } from 'react';

function AuthForm({ mode = "login", onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {mode === "signup" && (
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
        onChange={handleChange}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {mode === "signup" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
}

export default AuthForm;
