 const BASE_URL = "https://ai-powered-interview-prep-8a9m.onrender.com";

export const API_PATH = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    SIGNUP: "/api/v1/auth/signup",
    PROFILE: "/api/v1/authprofile",
    LOGOUT: "/api/v1/authlogout",
  },

  AI: {
    GENERATE_INTERVIEW_QUESTIONS: "/api/ai/generate-question",
    GENERATE_CONCEPT_EXPLANATION: "/api/ai/generate-explanation",
  },

  SESSION: {
    CREATE: "/api/v1/session/create",
    GET_MY_SESSIONS: "/api/v1/session/my-session",
    GET_BY_ID: (id) => `/api/v1/session/${id}`,
    DELETE: (id) => `/api/v1/session/${id}`,
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/v1/question/add",
    TOGGLE_PIN: (id) => `/api/v1/question/${id}/pin`,
    UPDATE_NOTE: (id) => `/api/v1/question/${id}/note`,
  },
};
export default BASE_URL