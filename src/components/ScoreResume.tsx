"use client"; // Keep this at the top of the file

import { useState, useEffect } from 'react';
import UploadResume from "./UploadResume"; // Import UploadResume
import ResumeText from "./ResumeText";
import JobText from "./JobText";
import RequestScore from "./RequestScore";

export default function ScoreResume() { // Use a named function export

    const [showScore, setShowScore] = useState(false);
    const [resumeText, setResumeText] = useState('');
    const [jobText, setJobText] = useState('');

    const handleParsedText = (text) => {
      setResumeText(text);
    };

    const handleResumeTextChange = (newText) => {
      setResumeText(newText)
    }
    const handleJobTextChange = (newText) => {  // Handler for JobText changes
        setJobText(newText);
    };

    const handleRequestScore = () => {
        setShowScore(true); // Show RequestScore after button click
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

