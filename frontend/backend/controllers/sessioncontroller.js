import Question from "../models/question.models.js";
import Session from "../models/session.models.js";

export const createSession = async (req, res) => {
  try {
    const {
      role,
      experience,
      topicsToFocus,
      description,
      questions,
    } = req.body;

    const userId = req.user.id;

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionIds = await Promise.all(
      questions.map(async (q) => {
        const questionDoc = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
          note: q.note,
        });
        return questionDoc._id;
      })
    );

    session.questions = questionIds;
    await session.save();

    res.status(201).json({
      success: true,
      message: "Session created successfully",
      session,
    });
  } catch (error) {
    console.log("Error in createSession controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getMySession = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json({ success: true, sessions });
  } catch (error) {
    console.log("error in getMySession controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.log("error in getSessionById controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    await Question.deleteMany({ session: session._id });
    await session.deleteOne();

    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.log("error in deleteSession controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
