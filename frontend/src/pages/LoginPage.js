import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !age || !condition) {
      return alert("Please fill all fields!");
    }

    const user = { name, age, condition };
    localStorage.setItem("user", JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-700 dark:text-blue-300">
          👤 Login to Weather Health System
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter your age"
            className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <select
            className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">Select Health Condition</option>
            <option value="asthma">Asthma</option>
            <option value="heart">Heart Problem</option>
            <option value="diabetes">Diabetes</option>
            <option value="none">None</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
