"use client"; // Keep this at the top of the file

import { useState, useEffect } from "react";
//import UploadResume from "./UploadResume"; // Import UploadResume
import ResumeText from "./ResumeText";
import JobText from "./JobText";
//import RequestScore from "./RequestScore";

export default function ScoreResume() {
  // Use a named function export

  const [showScore, setShowScore] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState(null);

  const handleParsedText = (text) => {
    setResumeText(text);
  };

  const handleResumeTextChange = (newText) => {
    setResumeText(newText);
  };
  const handleJobTextChange = (newText) => {
    // Handler for JobText changes
    setJobText(newText);
  };

  const handleRequestScore = async () => {
    if (!resumeText || !jobText) {
      // Handle case where either text area is empty (e.g., show an alert)
      alert("Please enter both resume and job text."); // Or a nicer notification
      return;
    }
    try {
      const response = await fetch("/api/GetResumeScore", {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resumeText, jobText })
      });
      if (!response.ok) {
        // Handle non-2xx responses (e.g., 400, 500 errors)
        const errorData = response.score; // Get error details if available
        throw new Error(
          `API request failed: 
          }`
        );
      }
      const data = await response.json();
      console.log("API Response:", data.JSON);
      setResult(data.JSON); // Or handle the data as needed
      // Update UI or state based on API response if necessary
      // Consider a loading indicator before and after the request
    } catch (error) {
      console.error("Error requesting score:", error);
      // Show an error message to the user, etc.
    }
  };

  const handleMakeCoverLetter = async () => {
    if (!resumeText || !jobText) {
      // Handle case where either text area is empty (e.g., show an alert)
      alert("Please enter both resume and job text."); // Or a nicer notification
      return;
    }
    try {
      const response = await fetch("/api/MakeCoverLetter", {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ resumeText, jobText })
      });
      if (!response.ok) {
        // Handle non-2xx responses (e.g., 400, 500 errors)
        const errorData = response.score; // Get error details if available
        throw new Error(
          `API request failed: 
          }`
        );
      }
      const data = await response.json();
      console.log("API Response:", data.JSON);
      setResult(data.JSON); // Or handle the data as needed
      // Update UI or state based on API response if necessary
      // Consider a loading indicator before and after the request
    } catch (error) {
      console.error("Error requesting score:", error);
      // Show an error message to the user, etc.
    }
  };

  return (
    <div>
      {/* <UploadResume onTextParsed={handleParsedText} /> */}

      <div className="flex flex-row space-x-4">
        {" "}
        {/* Use space-x-4 for horizontal spacing */}
        <ResumeText
          text={resumeText}
          onTextChange={handleResumeTextChange}
          className="w-1/2"
        />
        <JobText onTextChange={handleJobTextChange} className="w-1/2" />
      </div>

      <button
        onClick={handleRequestScore}
        disabled={!resumeText || !jobText}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Match Score
      </button>

      <button
        onClick={handleMakeCoverLetter}
        disabled={!resumeText || !jobText}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 ml-4" // Added margin
      >
        Make Cover Letter
      </button>
      {result && (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          {" "}
          {/* Container styles */}
          <p className="text-gray-800 font-medium text-sm leading-relaxed">
            {" "}
            {/* Text styles */}
            {result}
          </p>
        </div>
      )}
    </div>
  );
}
