import React, { useEffect, useRef, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getFromLocalStorage } from "../utils/localStorage";

const Register = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const file = useRef(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  useEffect(() => {
    if (getFromLocalStorage("UserInfo")) {
      navigate("/");
    }
  }, [navigate]);

  const userRegister_api = async ({ fullname, email, password }) => {
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("password", password);
      if (backendImage) {
        formData.append("profileImage", backendImage);
      }
      const response = await axios.post(
        "http://localhost:9000/user/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data?.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      userRegister_api({ fullname: name, email, password });
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      const image = URL.createObjectURL(file);
      setFrontendImage(image);
    }
  };
  return (
    <FormContainer>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className=" w-96 max-w-sm mx-auto bg-white p-6 rounded-lg shadow-2xl flex flex-col justify-center items-center mt-10"
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
        <h2 className="text-2xl font-bold mb-4 text-center uppercase">
          Register
        </h2>
        <div className="mb-4 w-[100px] h-[100px]  rounded-full bg-white overflow-hidden relative border-2 border-gray-300">
          <input type="file" hidden ref={file} onChange={handleImage} />
          <img src={frontendImage} alt="" className="w-[100%] h-[100%]" />
          <div
            className="w-[100%] h-[100%] bg-black absolute top-0 opacity-0 hover:opacity-50 transition duration-300 ease-in-out flex items-center justify-center cursor-pointer text-white text-[20px] font-semibold"
            onClick={() => file.current.click()}
          >
            +
          </div>
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </FormContainer>
  );
};

export default Register;
