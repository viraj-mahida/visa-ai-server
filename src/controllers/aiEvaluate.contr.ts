import type { Request, Response } from "express";
import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const aiEvaluateContr = async (req: Request, res: Response) => {
  
  const { prompt } = req.body;
  try {
    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: prompt
    })
  
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}