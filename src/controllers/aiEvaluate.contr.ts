import type { Request, Response } from "express";
import OpenAI, { toFile } from "openai";
import { getPrompt } from "../helper/aiEvaluate.helper.js";
import systumConfig from "../conifg/systumPrompt.json" with { type: "json" };
import { Evaluation } from "../models/evaluation.model.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ""
});

export const aiEvaluateContr = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "No file provided" })

  const { name, email, country, visa } = req.body;

  const fileObj = await toFile(
    req.file?.buffer,
    req.file.originalname, {
    type: req.file.mimetype
  })

  const uploadedFile = await client.files.create({
    file: fileObj,
    purpose: "assistants"
  });

  const visaPrompt = getPrompt({ country, visa });

  const systumPromt = systumConfig.systemPrompt;

  const prompt = `${systumPromt}\n\n${visaPrompt}`;

  try {
    const response = await client.responses.create({
      model: "gpt-3.5-turbo-0125",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt
            },
            {
              type: "input_file",
              file_id: uploadedFile.id
            }
          ]
        }
      ]
    })

    let evaluationData;
    try {
      evaluationData = JSON.parse(response.output_text);
    } catch (e) {
      return res.status(500).json({ error: "Failed to parse AI response" });
    }

    await Evaluation.create({
      name,
      email,
      country,
      visa,
      ...evaluationData
    });

    return res.status(200).json({
      evaluation: evaluationData
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}