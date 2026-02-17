import { APP_FEATURES } from "../utils/Data";
import { Link } from "react-router-dom";

function Landingpage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* HEADER */}
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Interview<span className="text-blue-500">Prep AI</span>
          </h1>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-sm pt-1.5 text-gray-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm">
              AI Powered Interview Questions
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Ace Your Next <br />
              <span className="text-blue-500">Tech Interview</span>
            </h1>

            <p className="mt-4 text-gray-400 max-w-md">
              Generate smart, role-based interview questions instantly and
              prepare with confidence.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://media.theresanaiforthat.com/interview-bot-ai.png"
              alt="AI Interview Illustration"
              className="h-full w-full"
            />
          </div>
        </section>

        {/* FEATURES */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {APP_FEATURES.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-600 transition"
            >
              <h3 className="text-lg font-semibold mb-2">{item.feature}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="mt-24 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} InterviewPrep AI. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Landingpage;
