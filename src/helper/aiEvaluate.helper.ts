import { VisaPrompt } from "../models/visaPrompt.model.js"

interface GetPromptProps {
  country: string,
  visa: string
}

export const getPrompt = async ({ country, visa }: GetPromptProps) => {
  try {
    const visaPrompt = await VisaPrompt.findOne(
      { country, visa },
      { prompt: 1, _id: 0 }
    ).lean();
  
    return visaPrompt?.prompt;
  } catch (error) {
    console.error("Error getting prompt:", error);
    throw new Error("Error getting prompt!");
  }
}