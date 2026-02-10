import Session from "../models/session.models.js";
import Question from "../models/question.models.js";

export const addQuestionToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
        note: q.note,
      }))
    );

 
    session.questions.push(
      ...createdQuestions.map((q) => q._id)
    );

  
    await session.save();

    res.status(201).json({
      success: true,
      message: "Questions added successfully",
      questions: createdQuestions,
    });
  } catch (error) {
    console.log(
      "error in the addQuestionToSession controller",
      error.message
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

export const togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.log(
      "error in the togglePinQuestion controller",
      error.message
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    question.note = note ?? ""; // keeps empty string valid
    await question.save();

    res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.log(
      "error in the updateQuestionNote controller",
      error.message
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
