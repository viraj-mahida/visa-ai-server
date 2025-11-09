import type { Request, Response } from "express";
import { VisaPrompt } from "../models/visaPrompt.model.js";

export const countryVisasContr = async (_req: Request, res: Response) => {
  try {
    const response = await VisaPrompt.aggregate([
      {
        $group: {
          _id: "$country",
          visas: { $addToSet: "$visa" }
        }
      }
    ]);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}