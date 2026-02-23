import { APP_FEATURES } from "../utils/Data";
import { Link } from "react-router-dom";
import { FiArrowRight, FiStar, FiCpu, FiShield, FiZap } from "react-icons/fi";
import { useState, useEffect } from "react";

function Landingpage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Feature icons mapping
  const getFeatureIcon = (index) => {
    const icons = [FiCpu, FiZap, FiStar, FiShield, FiCpu, FiZap];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="text-blue-400" size={24} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background pattern */}
      <div
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* HEADER with blur effect */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-slate-900/80 backdrop-blur-lg shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <Link to="/" className="group">
              <h1 className="text-xl sm:text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  InterviewPrep
                </span>
                <span className="text-white"> AI</span>
              </h1>
            </Link>

            <div className="flex items-center gap-3 sm:gap-6">
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-white transition-colors relative group"
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/signup"
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl font-medium"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center pt-24 sm:pt-28 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm">
                <FiZap size={14} className="text-blue-400" />
                AI Powered Interview Questions
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Ace Your Next{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Tech Interview
                  </span>
                </h1>

                <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed">
                  Generate smart, role-based interview questions instantly and
                  prepare with confidence using our AI-powered platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/signup"
                  className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-base sm:text-lg font-medium shadow-xl shadow-blue-500/25 hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  Start Preparing Now
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 sm:pt-8">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                   
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Active Users
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Questions Generated
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                   
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - ILLUSTRATION */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="bg-white/5 rounded-xl p-3 border border-white/10"
                    >
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg mb-2 flex items-center justify-center">
                        <FiCpu className="text-blue-400" size={16} />
                      </div>
                      <div className="h-1.5 w-12 bg-white/20 rounded mb-1.5"></div>
                      <div className="h-1.5 w-8 bg-white/10 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                InterviewPrep AI
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Everything you need to ace your technical interviews
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {APP_FEATURES.map((item, index) => (
              <div
                key={index}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon */}
                <div className="relative mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {getFeatureIcon(index)}
                </div>

                <h3 className="relative text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors">
                  {item.feature}
                </h3>

                <p className="relative text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 p-8 sm:p-12 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
                backgroundRepeat: "repeat",
              }}
            ></div>

            <div className="relative text-center max-w-2xl sm:max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                Ready to Ace Your Interview?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8">
                Join thousands of developers who have successfully landed their
                dream jobs
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-base sm:text-lg font-medium shadow-xl shadow-blue-500/25 hover:shadow-2xl"
              >
                Get Started For Free
                <FiArrowRight size={18} className="sm:w-5 sm:h-5" />
              </Link>
              <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
                No credit card required • Free forever
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 sm:py-12 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                InterviewPrep AI
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                AI-powered interview preparation platform
              </p>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                Product
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li>
                  <Link to="/features" className="hover:text-white transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                Company
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white transition">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                Legal
              </h4>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li>
                  <Link to="/privacy" className="hover:text-white transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-xs sm:text-sm text-gray-500 pt-4 sm:pt-8 border-t border-white/10">
            © {new Date().getFullYear()} InterviewPrep AI. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Landingpage;
