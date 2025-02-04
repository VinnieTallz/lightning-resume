"use client"

import { useState } from 'react';

function ResumeText({ onTextChange, text }) { // Receive onTextChange and text as props
    const [resumeText, setResumeText] = useState(text || '');  // Initialize with text prop


    const handleTextChange = (event) => {
        const newText = event.target.value;
        setResumeText(newText);
        if (onTextChange) {
            onTextChange(newText); // Now onTextChange is defined
        }
    };

    return (
        <textarea
            value={resumeText} // Bind to resumeText state
            onChange={handleTextChange}
            placeholder="Copy/Paste your resume text here...Or Upload your resume"
            rows={10}
            className="w-full border border-gray-300 rounded p-2"
        />
    );
}

export default ResumeText;

