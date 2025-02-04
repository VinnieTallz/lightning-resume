"use client"; // Keep this at the top of the file

import { useState, useEffect } from "react";
import UploadResume from "./UploadResume"; // Import UploadResume
import ResumeText from "./ResumeText";
import JobText from "./JobText";
import RequestScore from "./RequestScore";

export default function ScoreResume() {
  // Use a named function export

  const [showScore, setShowScore] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");

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
        const errorData = await response.json(); // Get error details if available
        throw new Error(
          `API request failed: ${response.status} - ${
            errorData.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      console.log("API Response:", data); // Or handle the data as needed
      // Update UI or state based on API response if necessary
      // Consider a loading indicator before and after the request
    } catch (error) {
      console.error("Error requesting score:", error);
      // Show an error message to the user, etc.
    }
  };

  useEffect(() => {
    console.log("Resume Text:", resumeText);
    console.log("Job Text:", jobText);
  }, [resumeText, jobText]);

  return (
    <div>
      {/* <UploadResume onTextParsed={handleParsedText} /> */}
      <ResumeText text={resumeText} onTextChange={handleResumeTextChange} />
      <JobText onTextChange={handleJobTextChange} />
      <button onClick={handleRequestScore} disabled={!resumeText || !jobText}>
        Request Score
      </button>
    </div>
  );
}
