"use client"

import { useState } from 'react';

function JobText({ onTextChange }: { onTextChange?: (text: string) => void }) { 
    const [jobText, setJobText] = useState('');

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm text-black"
        />
    );
}

export default JobText;
