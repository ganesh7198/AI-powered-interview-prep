import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FiBookOpen,
  FiCpu,
  FiClock,
  FiTag,
  FiChevronDown,
  FiChevronUp,
  FiLoader,
  FiMessageSquare,
} from "react-icons/fi";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";
import BASE_URL ,{API_PATH}from "../utils/Apipath"

function Interviewprep() {
  const { sessionId } = useParams();

  const [sessiondata, setsessiondata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // ================= FETCH SESSION =================
  const featchSessionData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}${API_PATH.SESSION.GET_BY_ID(sessionId)}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setsessiondata(res.data.session);
        // Initialize expanded state for questions with answers
        const expanded = {};
        res.data.session.questions.forEach((q) => {
          if (q.answer) expanded[q._id] = true;
        });
        setExpandedQuestions(expanded);
      }
    } catch (err) {
      seterror("Failed to load session");
    } finally {
      setloading(false);
    }
  };

  // ================= GENERATE EXPLANATION =================
  const generateConceptExplananation = async (questionId) => {
    try {
      setSelectedQuestionId(questionId);

      const res = await axios.post(
        `${BASE_URL}${API_PATH.AI.GENERATE_CONCEPT_EXPLANATION}`,
        { questionId },
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedQuestion = res.data.question;

        setsessiondata((prev) => ({
          ...prev,
          questions: prev.questions.map((q) =>
            q._id === updatedQuestion._id ? updatedQuestion : q
          ),
        }));

        // Auto-expand the question when answer is generated
        setExpandedQuestions((prev) => ({
          ...prev,
          [questionId]: true,
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSelectedQuestionId(null);
    }
  };

  // ================= TOGGLE PIN =================
  const toggleQuestionPinStates = async (questionId) => {
    try {
      await axios.patch(
        `${BASE_URL}${API_PATH.QUESTION.TOGGLE_PIN(questionId)}`,
        {},
        { withCredentials: true }
      );

      setsessiondata((prev) => ({
        ...prev,
        questions: prev.questions.map((q) =>
          q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= TOGGLE EXPAND =================
  const toggleExpand = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  useEffect(() => {
    if (sessionId) {
      featchSessionData();
    }
  }, [sessionId]);

  // Sort questions: pinned first
  const sortedQuestions = sessiondata?.questions
    ? [...sessiondata.questions].sort(
        (a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
      )
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="relative">
          <div className="h-16 w-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
          <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-sm">
            Loading your interview prep...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMessageSquare className="text-red-500" size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!sessiondata) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Session Not Found
          </h2>
          <p className="text-gray-500">
            The interview session you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 p-3 rounded-2xl">
              <FiBookOpen className="text-amber-600" size={24} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {sessiondata.role}
              </h1>
              <p className="text-gray-500 mb-3">{sessiondata.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiClock size={16} className="text-amber-500" />
                  <span>{sessiondata.experience} experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiTag size={16} className="text-amber-500" />
                  <span>{sessiondata.topicsToFocus}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FiCpu size={16} className="text-amber-500" />
                  <span>{sessiondata.questions.length} questions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {sortedQuestions.map((q, index) => (
            <div
              key={q._id}
              className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border ${
                q.isPinned
                  ? "border-amber-200 bg-amber-50/30"
                  : "border-gray-100"
              }`}
            >
              {/* Question Header */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-amber-100 text-amber-600 text-sm font-medium rounded-lg">
                        {index + 1}
                      </span>
                      <button
                        onClick={() => toggleQuestionPinStates(q._id)}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-all ${
                          q.isPinned
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {q.isPinned ? (
                          <>
                            <RiPushpinFill size={12} />
                            <span>Pinned</span>
                          </>
                        ) : (
                          <>
                            <RiPushpinLine size={12} />
                            <span>Pin</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h2 className="text-lg font-medium text-gray-800 leading-relaxed">
                      {q.question}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => generateConceptExplananation(q._id)}
                      disabled={selectedQuestionId === q._id}
                      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                      {selectedQuestionId === q._id ? (
                        <>
                          <FiLoader className="animate-spin" size={16} />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <FiCpu size={16} />
                          <span>Explain Concept</span>
                        </>
                      )}
                    </button>

                    {q.answer && (
                      <button
                        onClick={() => toggleExpand(q._id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                      >
                        {expandedQuestions[q._id] ? (
                          <FiChevronUp size={20} />
                        ) : (
                          <FiChevronDown size={20} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Answer Section (Expandable) */}
              {q.answer && expandedQuestions[q._id] && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="bg-linear-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100">
                      <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                        {q.answer}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {selectedQuestionId === q._id && !q.answer && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <div className="bg-linear-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center gap-3 text-gray-500">
                        <FiLoader className="animate-spin" size={18} />
                        <span>Generating explanation...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        {sortedQuestions.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-8">
            {sortedQuestions.filter((q) => q.isPinned).length} pinned •{" "}
            {sortedQuestions.length} total questions
          </p>
        )}
      </div>
    </div>
  );
}

export default Interviewprep;
