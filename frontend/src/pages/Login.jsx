import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorage";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userLogin_api = async ({ email, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/user/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      setToLocalStorage("UserInfo", response.data.user);
      navigate("/");
    } catch (error) {
      console.log(error?.response?.data?.message);
      console.log(error?.response);
      setError(error?.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    userLogin_api({ email, password });
  };

  useEffect(() => {
    if (getFromLocalStorage("UserInfo")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <FormContainer>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-96 max-w-sm mx-auto bg-white p-6 rounded-lg shadow-2xl"
      >
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </FormContainer>
  );
};

export default Login;
