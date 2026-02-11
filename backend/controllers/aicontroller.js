import { GoogleGenAI } from "@google/genai";
import {
  questionAnswerPrompt,
  conceptExplainPrompt,
} from "../utils/prompts.js";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


export const generateinterviewquestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestion } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestion) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestion
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const rawText = response.text;

    const cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(
      "error in generateinterviewquestion controller",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};


export const generateconceptexplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    res.status(200).json({
      success: true,
      explanation: response.text.trim(),
    });
  } catch (error) {
    console.log(
      "error in generateconceptexplanation controller",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
