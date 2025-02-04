// pages/api/GetResumeScore.js (or .ts)
import { NextResponse } from "next/server";
import OpenAI from "openai";

// export async function POST(request) {
//   console.log("API called:");
//   return NextResponse.json({ message: "Hello, world!" });
// }
export async function POST(req) {
  console.log("API called:", req.method, req.url);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" }); // Only POST requests
  }

  try {
    const body = await req.json(); // Parse the request body as JSON
    const { resumeText, jobText } = body; // Now you can access resumeText and jobText

    // Validate input (optional but recommended)
    if (!resumeText || !jobText) {
      return NextResponse.json({
        message: "Both resumeText and jobText are required."
      });
      // return res.status(400).json({ message: 'Both resumeText and jobText are required.' });
    }

    //  Your logic here to process resumeText and jobText
    // Example: call OpenAI API, database interaction, etc.

    // Example OpenAI API call:
    const openai = new OpenAI();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a recruiter for a tech company." },
        {
          role: "user",
          content: `Here is a job description and a resume.  Please evaluate how closely they match and provide a score from 1-10 with 10 being a perfect match. Job Description: ${jobText} Resume: ${resumeText}` // Use props here
        }
      ],
      store: true
    });
    console.log(completion.choices[0].message.content);
    //   const score = completion.data.choices[0].message?.content;
    //   return NextResponse.json({ message: 'Success', score: score }); // res.status(200).json({ score: score });
    return NextResponse.json({
      status: 200,
      score: completion.choices[0].message.content
    });
  } catch (error) {
    console.error("API Error:", error); // Log the error for debugging
    return NextResponse.json({ message: "Error", error: error.message });
    // res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Send error response
  }
}
