

 export const APP_FEATURES = [
  {
    id: 1,
    feature: "Role-Based Question Generation",
    description: "Generates interview questions based on selected job role",
    input: ["Frontend", "Backend", "Full Stack"],
    output: "List of interview questions"
  },
  {
    id: 2,
    feature: "Experience Level Selection",
    description: "Generates questions based on experience level",
    input: ["Fresher", "Mid-Level", "Senior"],
    output: "Difficulty-adjusted questions"
  },
  {
    id: 3,
    feature: "Topic-Based Questions",
    description: "Generate questions for specific topics",
    input: ["React", "JavaScript", "Node.js", "MongoDB"],
    output: "Topic-focused questions"
  },
  {
    id: 4,
    feature: "Question Difficulty Control",
    description: "Allows easy, medium, and hard question generation",
    input: ["Easy", "Medium", "Hard"],
    output: "Difficulty-based questions"
  },
  {
    id: 5,
    feature: "AI-Powered Question Creation",
    description: "Uses AI to generate unique, non-repetitive interview questions",
    input: ["Role", "Topic", "Experience"],
    output: "Custom interview questions"
  },
  {
    id: 6,
    feature: "Random Question Generator",
    description: "Generates random interview questions for quick practice",
    input: ["Any"],
    output: "Random interview questions"
  },
  {
    id: 7,
    feature: "Save Generated Questions",
    description: "Users can save questions for later practice",
    input: ["User action"],
    output: "Saved question list"
  },
  {
    id: 8,
    feature: "Export Questions",
    description: "Export generated questions as PDF or text",
    input: ["PDF", "Text"],
    output: "Downloadable file"
  }
];
