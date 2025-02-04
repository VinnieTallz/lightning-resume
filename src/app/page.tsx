
import ScoreResume from "../components/ScoreResume"

export default function Home() {





  return (
    
    <div>
<div className="text-center bg-gradient-to-r from-black via-purple-900 to-black text-white p-6 font-bold text-3xl rounded-lg shadow-lg">
    <h1>My Resume Buddy</h1>
    <p className="text-base mt-4 text-gray-300 italic"> {/* Styles added here */}
        Welcome to My Resume Buddy. An app that helps you see if a job is suited for you, and to help you make an amazing resume and cover letter. Simply copy/paste your resume and the description of the job you're interested in.  See how well your resume matches the job description, or get an amazing cover letter tailor made for you.
    </p>
</div>
        <ScoreResume />
    </div>
);
}