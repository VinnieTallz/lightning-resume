import { NextResponse } from "next/server";
import { generateCoverLetter, generateResume } from "../../openAI/resume/resume.mjs";
import {
  GENERATE_COVER_LETTER,
  RESUME_SOURCE_TYPE,
  UPLOADED_RESUME,
  RESUME_FILE,
  PASTED_RESUME,
  RESUME_CONTENT,
  JOB_DESCRIPTION,
  GENERATE_RESUME,
} from "../../utils/constants";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const action = formData.get("action");
    if (request.method === "POST") {
      const jobDescription = formData.get(JOB_DESCRIPTION);
        let resumeContent: string | null = null;
        const resumeSourceType = formData.get(RESUME_SOURCE_TYPE);
        if (resumeSourceType === UPLOADED_RESUME) {
          const resumeBlob = formData.get(RESUME_FILE);
          if (resumeBlob instanceof File) {
            resumeContent = await resumeBlob.text(); //user file converter to convert file
          } else {
            console.error("resumeBlob is not a File.");
            return NextResponse.json(
              { error: "Invalid resume file" },
              { status: 400 }
            );
          }
        } else if (resumeSourceType === PASTED_RESUME) {
          const formResumeContent = formData.get(RESUME_CONTENT);
          if (typeof formResumeContent === "string") {
            resumeContent = formResumeContent;
          }
        }
      if (action === GENERATE_COVER_LETTER) {
        const result = await generateCoverLetter(resumeContent, jobDescription);
        return NextResponse.json({ data: result.content }, { status: 200 });
      } else if (action == GENERATE_RESUME) {
        const result = await generateResume(resumeContent, jobDescription);
        return NextResponse.json({ data: result.content }, { status: 200 });
      }
      else {
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
      }
    } else {
      return NextResponse.json(
        { error: "Invalid request method" },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
