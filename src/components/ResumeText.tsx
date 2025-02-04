"use client"

import { useState } from 'react';

function ResumeText({ onTextChange, text }: { onTextChange?: (text: string) => void; text?: string }) { // Receive onTextChange and text as props
    const [resumeText, setResumeText] = useState(text || '');  // Initialize with text prop


    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = event.target.value;
        setResumeText(newText);
        if (onTextChange) {
            onTextChange(newText); // Now onTextChange is defined
        }
    };

    return (
<textarea
    value={resumeText}
    onChange={handleTextChange}
    placeholder="Copy/Paste your resume text here...Or Upload your resume"
    rows={10}
    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm text-black"
/>
    );
}

export default ResumeText;

