"use client"

import { useState } from 'react';

function JobText({ onTextChange }) { // Added onTextChange prop
    const [jobText, setJobText] = useState('');

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setJobText(newText);
        if (onTextChange) { // Call onTextChange if provided
            onTextChange(newText);
        }
    };

    return (
        <textarea
            value={jobText}
            onChange={handleTextChange}
            placeholder="Copy/PasteJob Description here"
            rows={10} // Adjust as needed
            className="w-full border border-gray-300 rounded p-2" // Basic styling
        />
    );
}

export default JobText;
