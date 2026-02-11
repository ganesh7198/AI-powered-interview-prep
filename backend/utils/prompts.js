export const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => {
  return `
You are an expert interviewer and mentor.

Role: ${role}
Experience Level: ${experience}
Topics to Focus On: ${topicsToFocus}

Generate ${numberOfQuestions} interview-style questions suitable for this role and experience level.

For each question:
- Provide a clear and concise answer
- Keep explanations practical and easy to understand
- Avoid unnecessary jargon
- Focus on real-world understanding

Return the response strictly in the following JSON format:

[
  {
    "question": "Question text here",
    "answer": "Detailed but simple answer here"
  }
]

Do not add any extra text outside the JSON.
`;
};

 export const conceptExplainPrompt = (question) => {
  return `
You are a skilled teacher who explains concepts in a simple and intuitive way.

Explain the following concept clearly:

"${question}"

Guidelines:
- Start with a simple definition
- Explain step-by-step
- Use real-world examples if helpful
- Keep the language beginner-friendly
- Avoid unnecessary complexity

End with a short summary in 2–3 lines.
`;
};
