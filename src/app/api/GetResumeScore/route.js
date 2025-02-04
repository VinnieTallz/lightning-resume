// pages/api/GetResumeScore.js (or .ts)
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' }); // Only POST requests
    }
  
    try {
      const { resumeText, jobText } = req.body;
  
      // Validate input (optional but recommended)
      if (!resumeText || !jobText) {
        return res.status(400).json({ message: 'Both resumeText and jobText are required.' });
      }
  
      //  Your logic here to process resumeText and jobText
      // Example: call OpenAI API, database interaction, etc.
  
  
       // Example OpenAI API call:
      const openai = new OpenAIApi(new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
      }))
  
      const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
              // ... your system messages
              {
                  role: "user",
                  content: `Here is a job description and a resume.  Please evaluate how closely they match and provide a score from 1-10 with 10 being a perfect match. Job Description: ${jobText} Resume: ${resumeText}`, // Use props here
              },
          ],
          // ... other OpenAI parameters
  
      });
  
      const score = completion.data.choices[0].message?.content;
  
  
      // Send the response. If successful, send something like this:
      res.status(200).json({ score: score });
  
    } catch (error) {
      console.error("API Error:", error); // Log the error for debugging
      res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Send error response
    }
  }
  