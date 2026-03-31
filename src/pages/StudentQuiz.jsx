import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const ASSESSMENT_TYPE = "Student Leadership Assessment";
const OWNER_EMAIL = "livingleadership7@gmail.com";
const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1588075592405-d3d4f0846961?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGNsYXNzcm9vbXxlbnwwfHwwfHx8MA%3D%3D"; // Unsplash: students

const questionVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

const optionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  selected: { opacity: 1, y: 0, scale: 1.05, boxShadow: "0 0 20px rgba(245,197,24,0.5)" }
};

const questions = [
  {
    q: "I choose to do what is right even when it is difficult.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I take responsibility for my actions.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I show respect to people with different opinions.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I stay honest even when I might get into trouble.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I manage my time and complete my tasks effectively.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I stay motivated even when things are challenging.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I listen carefully before responding to others.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I communicate my ideas clearly and confidently.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I work well with others in a team.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I think about how my actions affect others.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I take initiative to help improve my school or community.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  },
  {
    q: "I try to make a positive difference around me.",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4, 5]
  }
];

const results = [
  {
    min: 55,
    max: 60,
    icon: "🔥",
    badge: "IMPACT LEADER",
    title: "You Are an <span>Impact Leader</span>",
    remark: "You are a high-level student leader who demonstrates purpose, contribution, and ethical decision-making. Your leadership creates meaningful change and inspires others to follow your example.",
    tips: [
      { h: "Strengths", b: "Purpose-driven, ethical, impactful" },
      { h: "Growth Areas", b: "Scaling influence, mentoring others" },
      { h: "Next Steps", b: "Lead major initiatives, inspire peers" },
      { h: "Impact", b: "Creates positive change in community" }
    ]
  },
  {
    min: 46,
    max: 54,
    icon: "🌟",
    badge: "INFLUENTIAL LEADER",
    title: "You Are an <span>Influential Leader</span>",
    remark: "You positively influence your peers and show strong values, communication, and empathy. Your leadership inspires others and helps create a better environment around you.",
    tips: [
      { h: "Strengths", b: "Strong values, communication, empathy" },
      { h: "Growth Areas", b: "Strategic thinking, long-term vision" },
      { h: "Next Steps", b: "Take on leadership roles, mentor others" },
      { h: "Impact", b: "Influences peers and school culture" }
    ]
  },
  {
    min: 36,
    max: 45,
    icon: "🌳",
    badge: "DEVELOPING LEADER",
    title: "You Are a <span>Developing Leader</span>",
    remark: "You demonstrate stable leadership behaviors with strengths in teamwork, responsibility, and initiative. You're building a solid foundation for greater leadership impact.",
    tips: [
      { h: "Strengths", b: "Teamwork, responsibility, initiative" },
      { h: "Growth Areas", b: "Communication, motivation consistency" },
      { h: "Next Steps", b: "Practice leadership skills, seek opportunities" },
      { h: "Impact", b: "Supports team success and positive change" }
    ]
  },
  {
    min: 24,
    max: 35,
    icon: "🌿",
    badge: "EMERGING LEADER",
    title: "You Are an <span>Emerging Leader</span>",
    remark: "You show early leadership traits and are on a positive path. Focus on building consistency, communication, and motivation to strengthen your leadership abilities.",
    tips: [
      { h: "Strengths", b: "Early leadership traits, potential" },
      { h: "Growth Areas", b: "Consistency, communication, motivation" },
      { h: "Next Steps", b: "Build daily habits, practice skills" },
      { h: "Impact", b: "Growing positive influence" }
    ]
  },
  {
    min: 12,
    max: 23,
    icon: "🌱",
    badge: "EXPLORER",
    title: "You Are an <span>Explorer</span>",
    remark: "You are beginning your leadership journey and that's an exciting start! Focus on developing discipline, responsibility, and awareness to unlock your leadership potential.",
    tips: [
      { h: "Strengths", b: "Openness to learning, fresh perspective" },
      { h: "Growth Areas", b: "Discipline, responsibility, awareness" },
      { h: "Next Steps", b: "Learn leadership basics, try new experiences" },
      { h: "Impact", b: "Beginning to make positive contributions" }
    ]
  }
];

export default function StudentQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(12).fill(null));
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [emailStatus, setEmailStatus] = useState('');

  const selectOption = (i) => {
    const newAnswers = [...answers];
    newAnswers[current] = i;
    setAnswers(newAnswers);
  };

  const nextQ = () => {
    if (current < 12) setCurrent(current + 1);
  };

  const prevQ = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const submitAssessment = () => {
    if (!userName.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!userEmail.trim() || !/\S+@\S+\.\S+/.test(userEmail)) {
      alert('Please enter a valid email.');
      return;
    }
    if (!userPhone.trim() || !/^[0-9+\-() ]{7,20}$/.test(userPhone)) {
      alert('Please enter a valid contact number.');
      return;
    }

    const totalScore = answers.reduce((sum, a, i) => a !== null ? sum + questions[i].scores[a] : sum, 0);
    const assessmentResult = results.find(r => totalScore >= r.min && totalScore <= r.max) || results[3];
    setResult(assessmentResult);
    setShowResult(true);

    sendResultEmail(userName, userEmail, userPhone, totalScore, assessmentResult, answers);
  };

  const sendResultEmail = async (name, email, phone, score, result, ans) => {
    setEmailStatus('📧 Sending results...');

    const answerDetails = questions.map((q, i) => {
      const chosen = q.options[ans[i]];
      const pts = q.scores[ans[i]];
      return `Q${i + 1}: ${q.q}\n   Answer: ${chosen} (${pts} pts)`;
    }).join('\n\n');

    const emailBody = `
NEW ASSESSMENT RESULT — ${ASSESSMENT_TYPE}
=====================================
Name: ${name}
Email: ${email}
Phone: ${phone}
Assessment: ${ASSESSMENT_TYPE}
Total Score: ${score} / 60
Leadership Profile: ${result.badge}
Date: ${new Date().toLocaleString('en-IN')}

DETAILED ANSWERS:
${answerDetails}

PROFILE REMARK:
${result.remark.replace(/<[^>]+>/g, '')}
=====================================
    `;

    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: OWNER_EMAIL,
        from_name: name,
        user_email: email,
        user_phone: phone,
        message: emailBody
      }, 'YOUR_PUBLIC_KEY');
      setEmailStatus('✅ Results sent to owner!');
    } catch (e) {
      setEmailStatus('❌ Failed to send email.');
    }
  };

  const retakeAssessment = () => {
    setCurrent(0);
    setAnswers(Array(12).fill(null));
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setShowResult(false);
    setResult(null);
    setEmailStatus('');
  };

  const progressPercent = ((current + 1) / 13) * 100;

  return (
    <div className="min-h-screen relative text-white font-['DM_Sans'] overflow-hidden">
      <div className="absolute inset-0 bg-[#0d1b3e]/90 -z-10"></div>
      <header className="bg-[#0b1832] text-white py-2 text-center border-b border-[#f5c518]/20">
        <p className="text-sm font-bold">Living Leadership Academy</p>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid gap-6">
          <aside className="rounded-3xl overflow-hidden h-64 md:h-[420px] lg:h-[520px] relative">
            <img
              src={BACKGROUND_IMAGE}
              alt="Student Leadership"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1832]/90 via-[#0b1832]/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm md:text-base font-semibold">Student Leadership</p>
              <p className="text-xs md:text-sm text-[#d3d8ee]">Take the Assessment to discover your strengths.</p>
            </div>
          </aside>
          <section className="bg-[#111e3d] border border-[rgba(245,197,24,0.12)] rounded-3xl p-6 lg:p-8">
        {/* Assessment Header */}
        <div className="text-center mb-6 mt-2">
          <a href="/Assessment" className="inline-flex items-center gap-2 text-[#8fa0c0] text-sm no-underline mb-6 hover:text-[#f5c518] transition-colors">
            ← Back to Assessment Selection
          </a>
          <div className="inline-flex items-center gap-2 bg-[rgba(245,197,24,0.1)] border border-[rgba(245,197,24,0.3)] text-[#f5c518] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            🎒 Student Leadership Assessment
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-black mb-2 leading-tight">
            Discover Your <span className="text-[#f5c518]">Leadership Style</span>
          </h1>
          <p className="text-[#8fa0c0] text-sm leading-relaxed max-w-md mx-auto">
            Answer 12 questions to uncover your natural leadership strengths and areas for growth.
          </p>
        </div>

        {/* Progress */}
        {!showResult && (
          <div className="bg-[#111e3d] border border-[rgba(245,197,24,0.1)] rounded-xl p-5 mb-9">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-[#8fa0c0]">Progress</span>
              <span className="text-xs font-semibold text-[#f5c518]">{Math.min(current + 1, 13)} of 13</span>
            </div>
            <div className="h-1.5 bg-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden">
              <motion.div
                className="h-full bg-[#f5c518] rounded-lg"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              ></motion.div>
            </div>
          </div>
        )}

        {/* Assessment Area */}
        <AnimatePresence mode="wait">
          {!showResult && current < 12 && (
            <motion.div
              key={current}
              variants={questionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="bg-[#111e3d] border border-[rgba(245,197,24,0.12)] rounded-2xl p-9 mb-6"
            >
              <div className="text-xs uppercase tracking-wider text-[#f5c518] font-semibold mb-4">
                Question {Math.min(current + 1, 13)} of 13
              </div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold leading-relaxed mb-7">
                {questions[current].q}
              </h2>
              <div className="space-y-3">
                {questions[current].options.map((option, i) => (
                  <motion.div
                    key={i}
                    variants={optionVariants}
                    initial="initial"
                    animate={answers[current] === i ? "selected" : "animate"}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(245,197,24,0.3)" }}
                    whileTap={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-4 bg-[rgba(255,255,255,0.03)] border-2 border-[rgba(255,255,255,0.1)] rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-[rgba(245,197,24,0.4)] hover:bg-[rgba(245,197,24,0.05)] ${
                      answers[current] === i ? 'border-[#f5c518] bg-[rgba(245,197,24,0.1)]' : ''
                    }`}
                    onClick={() => selectOption(i)}
                  >
                    <div className={`w-7 h-7 min-w-7 rounded-lg border-2 flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                      answers[current] === i
                        ? 'bg-[#f5c518] border-[#f5c518] text-[#0d1b3e]'
                        : 'border-[rgba(255,255,255,0.2)] text-[#8fa0c0]'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="text-sm leading-relaxed pt-1 text-[#e8ecf5]">
                      {option}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Contact Form */}
          {!showResult && current === 12 && (
            <motion.div
              key={current}
              variants={questionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="bg-[#111e3d] border-2 border-[rgba(245,197,24,0.2)] rounded-2xl p-9 mb-6"
            >
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">Almost Done!</h3>
              <p className="text-[#8fa0c0] text-sm mb-7 leading-relaxed">
                Enter your details to receive your personalized leadership profile via email.
              </p>
              <div className="text-xs uppercase tracking-wider text-[#f5c518] font-semibold mb-4">
                Question 13 of 13
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#f5c518] uppercase tracking-wide mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    className="w-full bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white text-sm font-['DM_Sans'] outline-none focus:border-[#f5c518] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#f5c518] uppercase tracking-wide mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white text-sm font-['DM_Sans'] outline-none focus:border-[#f5c518] transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#f5c518] uppercase tracking-wide mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white text-sm font-['DM_Sans'] outline-none focus:border-[#f5c518] transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Card */}
        {showResult && result && (
          <div className="bg-[#111e3d] border-4 border-[#f5c518] rounded-3xl p-12 text-center animate-fadeIn">
            <div className="text-6xl mb-5">{result.icon}</div>
            <div className="inline-block bg-[#f5c518] text-[#0d1b3e] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-2xl mb-5">
              {result.badge}
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl font-black mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: result.title }}></h2>
            <p className="text-base text-[#e8ecf5] leading-relaxed max-w-lg mx-auto mb-8" dangerouslySetInnerHTML={{ __html: result.remark }}></p>
            <div className="h-px bg-[rgba(245,197,24,0.2)] my-7"></div>
            <h4 className="text-xs uppercase tracking-wider text-[#f5c518] mb-4 font-semibold">Your Leadership Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
              {result.tips.map((tip, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 text-xs text-[#e8ecf5] leading-relaxed">
                  <strong className="text-[#f5c518] block mb-1 uppercase tracking-wide">{tip.h}</strong>
                  {tip.b}
                </div>
              ))}
            </div>
            <div className="mt-9 flex gap-3 justify-center flex-wrap">
              <a href="/SchoolPrograms" className="bg-[#f5c518] text-[#0d1b3e] px-6 py-3 rounded-2xl text-sm font-bold no-underline inline-block hover:bg-[#e6b800] transition-colors">
                Enroll in Program
              </a>
              <button
                onClick={retakeAssessment}
                className="border-2 border-[rgba(245,197,24,0.4)] text-[#f5c518] px-5 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer bg-transparent hover:border-[#f5c518] transition-colors"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        )}

        {/* Buttons */}
        {!showResult && (
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <motion.button
              onClick={prevQ}
              disabled={current === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-[rgba(255,255,255,0.15)] text-[#8fa0c0] px-5 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer hover:border-[#f5c518] hover:text-[#f5c518] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>
            {current < 12 ? (
              <motion.button
                onClick={nextQ}
                disabled={answers[current] === null}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#f5c518] text-[#0d1b3e] px-7 py-3 rounded-2xl text-sm font-bold cursor-pointer hover:bg-[#e6b800] hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Question
              </motion.button>
            ) : (
              <motion.button
                onClick={submitAssessment}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#f5c518] text-[#0d1b3e] px-7 py-3 rounded-2xl text-sm font-bold cursor-pointer hover:bg-[#e6b800] hover:-translate-y-0.5 transition-all"
              >
                Get My Results
              </motion.button>
            )}
          </div>
        )}
          </section>
        </div>
      </main>
      <footer className="bg-[#0b1832] text-white py-3 text-center border-t border-[#f5c518]/20">
        <p className="text-xs opacity-75">© 2026 Living Leadership Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}