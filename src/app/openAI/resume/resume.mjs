import OpenAI from "openai";
const openai = new OpenAI();

export const generateResume = async (resumeContent, jobDescription) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a assistant, and you are going to receive a job description and a resume. You will polish my resume based on the job description." },
            {
                role: "user",
                content: `My resume: ${resumeContent}, Job description from the job posting: ${jobDescription}`,
            },
        ],
        store: true,
    });

    console.log(completion.choices[0].message);

    return completion.choices[0].message;
}

export const generateCoverLetter = async (resumeContent, jobDescription) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a recruiter, and you are going to receive a job description and a resume. You will write a cover letter based on the job description and resume." },
            {
                role: "user",
                content: `My resume: ${resumeContent}, Job description from the job posting: ${jobDescription}`,
            },
        ],
        store: true,
    });

    console.log(completion.choices[0].message);

    return completion.choices[0].message;
}
