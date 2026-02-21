import axios from "axios";
import Session from "../models/session.models.js";
import Question from "../models/question.models.js";

const openrouter = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
});
export const generateInterviewQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description } = req.body;
    const userId = req.user.id;

    // 1️⃣ Create Session
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
      questions: [],
    });

    const prompt = `
Generate exactly 5 interview questions.
Role: ${role}
Experience: ${experience}
Topics: ${topicsToFocus}
Description: ${description}

Return only a numbered list.
`;

const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "mistralai/mistral-7b-instruct",
    messages: [{ role: "user", content: prompt }],
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);
    const rawText = response.data.choices[0].message.content;

    const questionsArray = rawText
      .split("\n")
      .map((q) => q.replace(/^\d+[\).\s]*/, "").trim())
      .filter(Boolean);

    // 3️⃣ Save Questions
    const createdQuestions = await Question.insertMany(
      questionsArray.map((q) => ({
        session: session._id,
        question: q,
        answer: "",
      }))
    );

    session.questions = createdQuestions.map((q) => q._id);
    await session.save();

    res.status(201).json({
      success: true,
      session,
      questions: createdQuestions,
    });

  } catch (error) {
    console.log("Error in generateInterviewQuestion:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate questions" });
  }
};

export const generateconceptexplanation = async (req, res) => {
  try {
    const { questionId } = req.body;

    const questionDoc = await Question.findById(questionId);
    if (!questionDoc) {
      return res.status(404).json({ message: "Question not found" });
    }

const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "mistralai/mistral-7b-instruct",
    messages: [
      {
        role: "user",
        content: `Explain this interview question in simple words with an example:\n${questionDoc.question}`,
      },
    ],
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);

    const explanation = response.data.choices[0].message.content;

    questionDoc.answer = explanation;
    await questionDoc.save();

    res.status(200).json({
      success: true,
      question: questionDoc,
    });

  } catch (error) {
    console.log("Error in generateConceptExplanation:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate explanation" });
  }
};