import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const ASSESSMENT_TYPE = "Parent Leadership Assessment";
const OWNER_EMAIL = "livingleadership7@gmail.com";
const BACKGROUND_IMAGE = ""https://images.unsplash.com/photo-1648221350871-e3ae3c8d0f58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxwYXJlbnRzfGVufDB8fDB8fHww"; // Unsplash: family


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
    q: "When my child makes a mistake…",
    options: ["I guide them to understand and learn from it", "I correct them and explain what is right", "I focus on discipline", "I react emotionally"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you teach values to your child?",
    options: ["I model values consistently through my actions", "I teach values through conversations", "I remind them when needed", "I expect them to learn on their own"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "What is your priority as a parent?",
    options: ["Building strong character and values", "Balancing values and academic success", "Academic performance", "Discipline and control"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "When I feel stressed or frustrated…",
    options: ["I manage my emotions calmly", "I try to control but struggle sometimes", "I react but later reflect", "I express frustration immediately"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How intentional are you about your parenting?",
    options: ["I consciously reflect and improve regularly", "I try to improve when needed", "I follow what I have learned growing up", "I don't think much about it"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you respond when your child challenges you?",
    options: ["I stay calm and guide them with understanding", "I explain and correct", "I assert authority", "I react emotionally"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How often do you listen to your child without interrupting?",
    options: ["Almost always", "Often", "Sometimes", "Rarely"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How comfortable is your child in sharing openly with you?",
    options: ["Very comfortable and open", "Mostly comfortable", "Shares only when needed", "Hesitant or reserved"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "Your relationship with your child is mostly:",
    options: ["Trust-based and open", "Respectful and guided", "Instructional", "Controlling"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you encourage your child to think about others?",
    options: ["I actively guide them to help and care for others", "I remind them occasionally", "I expect them to learn from school", "I don't focus much on this"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you define success for your child?",
    options: ["Character, purpose, and contribution", "Balanced success (character + academics)", "Academic achievement", "Stability and security"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "What impact do you want your child to have in the future?",
    options: ["Make a positive difference in society", "Be successful and responsible", "Have a stable career", "Live a comfortable life"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you handle sibling conflicts in your family?",
    options: ["Teach conflict resolution skills and mediate fairly", "Intervene decisively to maintain peace", "Let them work it out themselves", "Find it exhausting and avoid involvement"],
    scores: [4, 3, 2, 1]
  },
  {
    q: "When it comes to your child's education, you…",
    options: ["Partner with teachers and supplement learning at home", "Trust the school system to handle academics", "Focus on their happiness over achievement", "Feel overwhelmed by the education landscape"],
    scores: [4, 3, 2, 1]
  },
  {
    q: "How do you balance work, family, and personal needs?",
    options: ["Intentionally structure time for all three areas", "Work hard and make family time when possible", "Prioritize family over work and self-care", "Struggle to balance them effectively"],
    scores: [4, 3, 2, 1]
  }
];

const results = [
  {
    min: 0,
    max: 40,
    icon: "🌱",
    badge: "REACTIVE PARENT",
    title: "You Are a <span>Reactive Parent</span>",
    remark: "Parenting is mostly situational and emotional reactions dominate. This is a common starting point, and with awareness, you can develop more intentional leadership in your parenting.",
    tips: [
      { h: "Strengths", b: "Love for your child, basic care" },
      { h: "Growth Areas", b: "Emotional regulation, intentionality" },
      { h: "Next Steps", b: "Practice self-reflection, learn parenting strategies" },
      { h: "Impact", b: "Building stronger family foundation" }
    ]
  },
  {
    min: 41,
    max: 60,
    icon: "🌿",
    badge: "MANAGING PARENT",
    title: "You Are a <span>Managing Parent</span>",
    remark: "You provide structure and are growing in your awareness of parenting leadership. You balance discipline with care, creating a stable environment for your child.",
    tips: [
      { h: "Strengths", b: "Structure, growing awareness" },
      { h: "Growth Areas", b: "Emotional connection, intentional values" },
      { h: "Next Steps", b: "Focus on relationship building, model values" },
      { h: "Impact", b: "Stable and supportive family" }
    ]
  },
  {
    min: 61,
    max: 75,
    icon: "🌳",
    badge: "SUPPORTIVE PARENT",
    title: "You Are a <span>Supportive Parent</span>",
    remark: "You build strong connections and encourage your child's development. Your parenting creates a nurturing environment that fosters growth and confidence.",
    tips: [
      { h: "Strengths", b: "Connection, encouragement" },
      { h: "Growth Areas", b: "Consistency, societal awareness" },
      { h: "Next Steps", b: "Set clear family values, encourage community involvement" },
      { h: "Impact", b: "Confident and connected child" }
    ]
  },
  {
    min: 76,
    max: 90,
    icon: "🌟",
    badge: "INTENTIONAL PARENT",
    title: "You Are an <span>Intentional Parent</span>",
    remark: "You practice conscious parenting, actively building values and leadership in your child. Your approach creates a strong foundation for character development.",
    tips: [
      { h: "Strengths", b: "Conscious parenting, values focus" },
      { h: "Growth Areas", b: "Societal leadership, deeper transformation" },
      { h: "Next Steps", b: "Mentor other parents, focus on legacy" },
      { h: "Impact", b: "Character-driven family leadership" }
    ]
  },
  {
    min: 91,
    max: 100,
    icon: "🔥",
    badge: "TRANSFORMATIONAL PARENT",
    title: "You Are a <span>Transformational Parent</span>",
    remark: "You shape character deeply and raise future leaders. Your parenting goes beyond the family, influencing society through the values and leadership you instill.",
    tips: [
      { h: "Strengths", b: "Deep character shaping, leadership focus" },
      { h: "Growth Areas", b: "Continuous growth, broader impact" },
      { h: "Next Steps", b: "Lead parenting communities, create change" },
      { h: "Impact", b: "Raising societal leaders and change-makers" }
    ]
  }
];

export default function ParentQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(12).fill(null));
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
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

  const submitQuiz = () => {
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
    const scaledScore = (totalScore / 60) * 100;
    const assessmentResult = results.find(r => scaledScore >= r.min && scaledScore <= r.max) || results[0];
    setResult(assessmentResult);
    setFinalScore(scaledScore);
    setShowResult(true);

    sendResultEmail(userName, userEmail, scaledScore, assessmentResult, answers);
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
Total Score: ${score} / 100
Leadership Profile: ${result.badge}
Date: ${new Date().toLocaleString('en-IN')}

DETAILED ANSWERS:
${answerDetails}

PROFILE REMARK:
${result.remark.replace(/<[^>]+>/g, '')}
=====================================
    `;

    try {
      await emailjs.send('service_vt57q96', 'template_t5t41xr', {
        to_email: OWNER_EMAIL,
        from_name: name,
        user_email: email,
        phone: phone,
        message: emailBody
      }, 'IOkjwU2XYn-lTl6Wh');
      setEmailStatus('✅ Results sent to owner!');
    } catch (e) {
      setEmailStatus('❌ Failed to send email.');
    }
  };

  const retakeQuiz = () => {
    setCurrent(0);
    setAnswers(Array(12).fill(null));
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setShowResult(false);
    setResult(null);
    setFinalScore(0);
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
              alt="Parent Leadership"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1832]/90 via-[#0b1832]/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm md:text-base font-semibold">Parent Leadership</p>
              <p className="text-xs md:text-sm text-[#d3d8ee]">Take the Assessment to assess your leadership potential.</p>
            </div>
          </aside>
          <section className="bg-[#111e3d] border border-[rgba(245,197,24,0.12)] rounded-3xl p-6 lg:p-8">
        {/* Assessment Header */}
        <div className="text-center mb-6 mt-2">
          <a href="/Assessment" className="inline-flex items-center gap-2 text-[#8fa0c0] text-sm no-underline mb-6 hover:text-[#f5c518] transition-colors">
            ← Back to Assessment Selection
          </a>
          <div className="inline-flex items-center gap-2 bg-[rgba(245,197,24,0.1)] border border-[rgba(245,197,24,0.3)] text-[#f5c518] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            👨‍👩‍� Parent Leadership Assessment
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-black mb-2 leading-tight">
            Parent <span className="text-[#f5c518]">Leadership Assessment</span>
          </h1>
          <p className="text-[#8fa0c0] text-sm leading-relaxed max-w-md mx-auto">
            Answer 12 questions to assess your parenting leadership potential.
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

        {/* Quiz Area */}
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
              <a href="/FamilyPrograms" className="bg-[#f5c518] text-[#0d1b3e] px-6 py-3 rounded-2xl text-sm font-bold no-underline inline-block hover:bg-[#e6b800] transition-colors">
                Enroll in Program
              </a>
              <button
                onClick={retakeQuiz}
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
                onClick={submitQuiz}
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
