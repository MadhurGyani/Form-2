import React, { useState, useEffect } from 'react';
import useValidation from '../hooks/useValidate';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

  const { errors, validate } = useValidation(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedData(formData);
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
  };

  useEffect(() => {
    if (submittedData) {
      setSubmittedData(null);
    }
  }, [formData]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
          {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
          {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Position:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          >
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div className="mb-4">
            <label className="block text-gray-700">Relevant Experience:</label>
            <input
              type="number"
              name="relevantExperience"
              value={formData.relevantExperience}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              min={1}
            />
            {errors.relevantExperience && (
              <span className="text-red-500">{errors.relevantExperience}</span>
            )}
          </div>
        )}
        {formData.position === 'Designer' && (
          <div className="mb-4">
            <label className="block text-gray-700">Portfolio URL:</label>
            <input
              type="url"
              name="portfolioURL"
              value={formData.portfolioURL}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
            {errors.portfolioURL && <span className="text-red-500">{errors.portfolioURL}</span>}
          </div>
        )}
        {formData.position === 'Manager' && (
          <div className="mb-4">
            <label className="block text-gray-700">Management Experience:</label>
            <input
              type="text"
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
            {errors.managementExperience && (
              <span className="text-red-500">{errors.managementExperience}</span>
            )}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Additional Skills:</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="additionalSkills"
                value="JavaScript"
                checked={formData.additionalSkills.includes('JavaScript')}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setFormData((prevData) => ({
                    ...prevData,
                    additionalSkills: checked
                      ? [...prevData.additionalSkills, value]
                      : prevData.additionalSkills.filter((skill) => skill !== value),
                  }));
                }}
              />
              <span className="ml-2">JavaScript</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                name="additionalSkills"
                value="CSS"
                checked={formData.additionalSkills.includes('CSS')}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setFormData((prevData) => ({
                    ...prevData,
                    additionalSkills: checked
                      ? [...prevData.additionalSkills, value]
                      : prevData.additionalSkills.filter((skill) => skill !== value),
                  }));
                }}
              />
              <span className="ml-2">CSS</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                name="additionalSkills"
                value="Python"
                checked={formData.additionalSkills.includes('Python')}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setFormData((prevData) => ({
                    ...prevData,
                    additionalSkills: checked
                      ? [...prevData.additionalSkills, value]
                      : prevData.additionalSkills.filter((skill) => skill !== value),
                  }));
                }}
              />
              <span className="ml-2">Python</span>
            </label>
          </div>
          {errors.additionalSkills && (
            <span className="text-red-500">{errors.additionalSkills}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={formData.preferredInterviewTime}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
            min={getCurrentDateTime()}
          />
          {errors.preferredInterviewTime && (
            <span className="text-red-500">{errors.preferredInterviewTime}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {submittedData && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow-md">
          <h2 className="text-lg font-bold">Submitted Data:</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Position:</strong> {submittedData.position}</p>
          {(submittedData.position === 'Developer' || submittedData.position === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience}</p>
          )}
          {submittedData.position === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {submittedData.portfolioURL}</p>
          )}
          {submittedData.position === 'Manager' && (
            <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {submittedData.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {submittedData.preferredInterviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
