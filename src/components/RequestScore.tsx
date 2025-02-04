import OpenAI from "openai";

export default function RequestScore() {

    const openai = new OpenAI();

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a recruiter for a sofware development company." },
            {
                role: "user",
                content: "Here is a job description and a resume.  Please evaluate how closely they match and provide a score.  Heres the job description: As Software Engineer, you will: Design, and build systems for collecting, storing and analyzing data. The candidates profile is located at https://www.linkedin.com/in/vineet-s-29932639/",
            },
        ],
        store: true,
    });



  return (
    <div>
        
    </div>
);