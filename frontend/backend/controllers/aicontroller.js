import { GoogleGenAI } from "@google/genai";
import Session from "../models/session.models.js";
import Question from "../models/question.models.js";

const getGenAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not found in environment");
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};


export const generateinterviewquestion = async (req, res) => {
  try {
    const genAI = getGenAI();

    const { sessionId } = req.body;

  
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

   
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });


    const prompt = `
Generate 5 interview questions for:
Role: ${session.role}
Experience: ${session.experience}
Topics: ${session.topicsToFocus}

Return only a numbered list.
`;

 
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // 5️⃣ Convert text → array of questions
    const questionsArray = rawText
      .split("\n")
      .map((q) => q.replace(/^\d+[\).\s]*/, "").trim())
      .filter(Boolean);

  
    const createdQuestions = await Question.insertMany(
      questionsArray.map((q) => ({
        session: session._id,
        question: q,
        answer: "", 
      }))
    );

    
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(200).json({
      success: true,
      questions: createdQuestions,
    });
  } catch (error) {
    console.log("Error in generateinterviewquestion:", error.message);
    res.status(500).json({ message: error.message });
  }
};


export const generateconceptexplanation = async (req, res) => {
  try {
    const genAI = getGenAI();

    const { questionId } = req.body;


    const questionDoc = await Question.findById(questionId);
    if (!questionDoc) {
      return res.status(404).json({ message: "Question not found" });
    }

  
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

   
    const result = await model.generateContent(
      `Explain this interview question in simple words with an example:\n${questionDoc.question}`
    );

    const explanation = result.response.text();

    questionDoc.answer = explanation;
    await questionDoc.save();

    res.status(200).json({
      success: true,
      question: questionDoc,
    });
  } catch (error) {
    console.log("Error in generateconceptexplanation:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
