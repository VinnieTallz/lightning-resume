"use client"
import { useState } from 'react';
import ResumeText from './ResumeText'; // Import your ResumeText component


function ResumeUpload() {
    // ... (Existing state and handlers)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && /\.(pdf|txt|doc)$/i.test(file.name)) {
            setSelectedFile(file);
            parseFile(file); // Parse the file immediately after selection
        } else {
            // ... (Existing error handling)
        }
    };



  const [parsedText, setParsedText] = useState("");




    const parseFile = (file) => {
        const reader = new FileReader();


        reader.onload = (e) => {
            let text = e.target.result as string;

            if (file.type === 'application/pdf') {
              // PDF Parsing Logic - needs a library in the browser
              // For example, using pdf.js or a server-side solution would be required
              //  Example with a placeholder (replace with actual PDF parsing)

              text = 'PDF parsing not supported in the browser. Consider server-side solutions or pdf.js.';


            } else if(file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
                // For .doc and .docx files, we'll use mammoth.js
                // make sure to install mammoth and @types/mammoth:
                // npm i mammoth @types/mammoth

                const mammoth = require("mammoth");
                mammoth.extractRawText({arrayBuffer: e.target.result as ArrayBuffer})
                .then(result => {
                    text = result.value
                    setParsedText(text);
                })
                .done();



            } else {
                setParsedText(text); // Set text directly for txt files
            }

        };

        if (file.type === 'application/pdf') {
            reader.readAsDataURL(file); // Or readAsArrayBuffer depending on PDF.js version

        } else if (file.type === "application/msword" || file.type ==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
            reader.readAsArrayBuffer(file)
        } else {

            reader.readAsText(file);
        }
    };




    return (
        <div>
            {/* ... (Existing input and button) */}
            <ResumeText text={parsedText} /> {/* Pass parsedText to ResumeText */}
        </div>
    );
}

// ... (rest of the component)

export default ResumeUpload;
