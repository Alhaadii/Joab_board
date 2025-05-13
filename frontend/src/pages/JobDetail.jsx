import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFromLocalStorage } from "../utils/localStorage.js";
import axios from "axios";
const JobDetail = () => {
  const [error, setError] = useState(null);
  const [job, setJob] = useState(null);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  useEffect(() => {
    if (!getFromLocalStorage("UserInfo")?.token) {
      navigate("/login");
    }
  }, [navigate]);

  const getJob_api = async (id) => {
    try {
      if (!getFromLocalStorage("UserInfo")?.token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`http://localhost:9000/jobs/api/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage("UserInfo")?.token}`,
        },
      });
      setJob(response.data);
      console.log(response.data);
    } catch (error) {
      setError("Error: ", error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    if (id) {
      getJob_api(id);
    }
  }, [id]);

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className=" container">
      <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
        <span className="text-center text-green-800 block"> {job._id} </span>
        <h2 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h2>
        <p className="text-gray-600 mb-2">
          {job.company} • {job.location}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Type:</strong> {job.jobType}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Salary:</strong> {job.salary}
        </p>
        <p className="text-sm text-gray-700 mb-2">{job.description}</p>
        <div className="mb-2">
          <strong className="text-sm text-gray-800">Requirements:</strong>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Contact:</strong> {job.contactEmail}
        </p>
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
        >
          Apply Now
        </a>
        <p className="text-xs text-gray-500 mt-2">Posted on: {job.postedAt}</p>
      </div>
    </div>
  );
};

export default JobDetail;
