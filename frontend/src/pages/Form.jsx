import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getFromLocalStorage } from "../utils/localStorage";

const Form = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [postedAt, setPostedAt] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [applyLink, setApplyLink] = useState("");

  useEffect(() => {
    if (!getFromLocalStorage("UserInfo")) {
      navigate("/login");
    }
  }, [navigate]);

  const createJob = async () => {
    try {
      const userInfo = getFromLocalStorage("UserInfo");
      if (!userInfo) {
        navigate("/login");
        return;
      }
      const response = await axios.post(
        "http://localhost:9000/jobs/api",
        {
          title,
          company,
          location,
          description,
          requirements,
          salary,
          jobType,
          postedAt,
          contactEmail,
          applyLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getFromLocalStorage("UserInfo")?.token}`,
          },
        }
      );
      if (response.status === 201) {
        navigate("/");
      } else {
        setError("Failed to create job");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const updateJob = async (id) => {
    try {
      const userInfo = getFromLocalStorage("UserInfo");
      if (!userInfo) {
        navigate("/login");
        return;
      }
      const response = await axios.put(
        `http://localhost:9000/jobs/api/${id}`,
        {
          title,
          company,
          location,
          description,
          requirements,
          salary,
          jobType,
          postedAt,
          contactEmail,
          applyLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getFromLocalStorage("UserInfo")?.token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/");
      } else {
        setError("Failed to update job");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const get_job_api = async (id) => {
    try {
      const userInfo = getFromLocalStorage("UserInfo");
      if (!userInfo) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`http://localhost:9000/jobs/api/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLocalStorage("UserInfo")?.token}`,
        },
      });
      if (response.status === 200) {
        setTitle(response.data.title);
        setCompany(response.data.company);
        setLocation(response.data.location);
        setDescription(response.data.description);
        setRequirements(response.data.requirements);
        setSalary(response.data.salary);
        setJobType(response.data.jobType);
        setPostedAt(response.data.postedAt);
        setContactEmail(response.data.contactEmail);
        setApplyLink(response.data.applyLink);
        setIsEdit(true);
      } else {
        setError("Failed to fetch job data");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  useEffect(() => {
    if (id) {
      get_job_api(id);
    } else {
      setIsEdit(false);
      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setRequirements([]);
      setSalary("");
      setJobType("");
      setPostedAt("");
      setContactEmail("");
      setApplyLink("");
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      if (id) {
        updateJob(id);
      }
    } else {
      createJob();
    }
  };

  return (
    <div className="container p-5">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form
        className="mx-auto bg-white p-6 rounded-lg shadow-2xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-2xl font-bold mb-4">
          {" "}
          {isEdit ? "Update The Job" : "Register New Job"}{" "}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            id="title"
            required
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              type="text"
              defaultValue={company}
              onChange={(e) => setCompany(e.target.value)}
              id="company"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              defaultValue={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          <textarea
            id="description"
            rows="4"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            cols={50}
            placeholder="Write the job description here..."
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="requirements"
            className="block text-sm font-medium text-gray-700"
          >
            Requirements (comma-separated)
          </label>
          <input
            type="text"
            id="requirements"
            defaultValue={requirements.join(", ")}
            onChange={(e) => setRequirements(e.target.value.split(","))}
            placeholder="e.g. React, Node.js, CSS"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salary
            </label>
            <input
              defaultValue={salary}
              onChange={(e) => setSalary(e.target.value)}
              type="text"
              id="salary"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="jobType"
              className="block text-sm font-medium text-gray-700"
            >
              Job Type
            </label>
            <input
              type="text"
              id="jobType"
              defaultValue={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="postedAt"
              className="block text-sm font-medium text-gray-700"
            >
              Posted At
            </label>
            <input
              type="datetime-local"
              id="postedAt"
              defaultValue={
                postedAt ? new Date(postedAt).toISOString().slice(0, 16) : ""
              }
              onChange={(e) =>
                setPostedAt(
                  e.target.value ? new Date(e.target.value).toISOString() : ""
                )
              }
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Email
            </label>
            <input
              type="email"
              defaultValue={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              id="contactEmail"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="applyLink"
            className="block text-sm font-medium text-gray-700"
          >
            Apply Link
          </label>
          <input
            type="url"
            id="applyLink"
            defaultValue={applyLink}
            onChange={(e) => setApplyLink(e.target.value)}
            placeholder="https://example.com/apply"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isEdit ? "Update Job" : "Register Job"}
        </button>
      </form>
    </div>
  );
};

export default Form;
