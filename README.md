# 🤖 AI Powered Interview Prep

AI Powered Interview Prep is a full-stack web application that helps users prepare for technical interviews through AI-generated questions, personalized interview sessions, and instant feedback. Users can practice interviews, track their progress, and improve their confidence using an interactive AI assistant.

---

# 🚀 Features

### 🔐 Authentication

* User Registration & Login
* JWT Authentication
* Secure Password Hashing (bcrypt)
* Protected Routes

### 🤖 AI Interview Generation

* Generate interview questions using AI
* Role-specific interview preparation
* Difficulty-based question generation
* Custom interview topics

### 💬 Interactive Interview Sessions

* AI-powered interview conversations
* Follow-up questions based on user responses
* Realistic interview experience

### 📊 Performance Tracking

* View previous interview sessions
* Track progress over time
* Review completed interviews

### 📝 AI Feedback

* Instant feedback on responses
* Strengths and improvement suggestions
* Overall interview score

### 📚 Interview History

* Save interview sessions
* Review questions and answers
* Continue previous practice sessions

### 🎯 Personalized Preparation

* Select job role
* Choose experience level
* Customize interview focus

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router
* Tailwind CSS
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Token)
* bcrypt

## AI Integration

* OpenRouter API
* Large Language Models (LLMs)

## Additional Tools

* dotenv
* CORS
* Cookie Parser

---

# 📂 Project Structure

```text
AI-Interview-Prep/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── assets/
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone <repository-url>
cd AI-Interview-Prep
```

## Install Backend

```bash
cd server
npm install
npm run dev
```

## Install Frontend

```bash
cd client
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=2000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

OPENROUTER_API_KEY=your_openrouter_api_key

CLIENT_URL=http://localhost:5173
```

---

# 📡 API Overview

## Authentication

* POST `/api/v1/auth/signup`
* POST `/api/v1/auth/login`
* POST `/api/v1/auth/logout`

## User

* GET `/api/v1/user/profile`
* PUT `/api/v1/user/profile`

## Interviews

* POST `/api/v1/interview/create`
* GET `/api/v1/interview`
* GET `/api/v1/interview/:id`
* DELETE `/api/v1/interview/:id`

## AI

* POST `/api/v1/ai/generate`
* POST `/api/v1/ai/feedback`

---

# 🎯 How It Works

1. Register or log in to your account.
2. Choose your target job role (Frontend, Backend, Full Stack, etc.).
3. Select the interview difficulty level.
4. Start an AI-powered interview session.
5. Answer AI-generated questions.


---


# 🌟 Future Improvements

* Voice-based AI interviews
* Video interview simulation
* Resume analysis
* Company-specific interview preparation
* Coding interview support
* Behavioral interview mode
* Mock interview timer
* Leaderboard and achievements
* PDF interview reports
* Multi-language support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ganesh H**

If you found this project helpful, consider giving it a ⭐ on GitHub!
