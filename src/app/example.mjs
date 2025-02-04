import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a recruiter for a sofware development company." },
        {
            role: "user",
            content: "Here is a job description and a resume.  Please evaluate how closely they match and provide a score.  Heres the job description: As Software Engineer, you will: Design, and build systems for collecting, storing and analyzing data. The candidates resume is: Problem solver with a background in design and installation of complex networking and telecommunications systems. Recently expanded skillset to include full-stack software development through InceptionU with a focus on web-applications.",
        },
    ],
    store: true,
});

console.log(completion.choices[0].message);