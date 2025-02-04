import pdf from "pdf-parse";
import mammoth from "mammoth";
import fs from "fs/promises";

const extractTextFromPDF = async(file) => {
    const buffer = await file.arrayBuffer();
    const data = await pdf(Buffer.from(buffer));
    return data.text;
}

const extractTextFromDOCX = async (file) => {
    const buffer = await file.arrayBuffer();
    const data = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
    return data.value;
}

export { extractTextFromPDF, extractTextFromDOCX };



