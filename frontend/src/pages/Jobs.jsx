import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { useState, useEffect } from "react";
import axios from "axios";
import { getFromLocalStorage } from "../utils/localStorage.js";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [jobQuery, setJobQuery] = useState();
  const navigate = useNavigate();

  const filteredJobs = jobs?.filter((job) => {
    return job?.title?.toLowerCase().includes(jobQuery?.toLowerCase() || "");
  });

  useEffect(() => {
    if (!getFromLocalStorage("UserInfo")?.token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const userInfo = getFromLocalStorage("UserInfo");
      if (!userInfo || !userInfo.token) {
        setError("Please login to view jobs.");
        return;
      }
      const response = await axios.get("http://localhost:9000/jobs/api/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setJobs(response.data.jobs);
    } catch (error) {
      setError("Error: ", error.message);
      settimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Job Listings[{filteredJobs?.length}]
      </h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex justify-center items-center max-w-min mx-auto mb-5">
        <input
          type="text"
          name="search"
          id="search"
          className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-96"
          onChange={(e) => {
            setJobQuery(e.target.value);
          }}
        />
        <button
          className="bg-blue-400 w-28 border-none p-2 rounded-md text-white hover:bg-blue-500"
          style={{ cursor: "pointer" }}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredJobs?.map((job, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {job.title}
            </h2>
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
            <div className=" flex flex-col justify-between items-center mt-4 lg:flex-row gap-2">
              <Link
                to={`/diary/form/${job?._id}`}
                className="inline-block  mt-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                Edit
              </Link>
              <Link
                to={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mx-8 mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Apply Now
              </Link>
              <Link
                to={`/diary/details/${job?._id}`}
                className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                View
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Posted on: {job.postedAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
