import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const ASSESSMENT_TYPE = "Teacher / Professor Leadership Assessment";
const OWNER_EMAIL = "livingleadership7@gmail.com";
const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1280&q=80"; // Unsplash: teacher

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
    q: "When I make a mistake in my teaching…",
    options: ["I openly accept it and correct it", "I reflect and improve quietly", "I move on without much thought", "I justify my decision"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "What drives your decisions as an educator?",
    options: ["Values and long-term impact on students", "Balancing values and practical needs", "Immediate results and outcomes", "External expectations (management/pressure)"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you model values to students?",
    options: ["I consistently live what I teach", "I try, but not always consciously", "I teach values more than demonstrate", "I focus more on academic delivery"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you handle stress in your role?",
    options: ["I stay calm and manage it effectively", "I manage but feel overwhelmed sometimes", "I struggle but continue working", "I react emotionally"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you approach your personal growth?",
    options: ["I actively learn and upgrade myself regularly", "I learn when required", "I depend on experience", "I rarely focus on self-development"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "When facing challenges in teaching…",
    options: ["I take ownership and find solutions", "I seek help and guidance", "I manage somehow", "I feel stuck or blame external factors"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "In student interactions…",
    options: ["I listen deeply and understand their needs", "I listen but focus on instruction", "I guide more than listen", "I focus mainly on discipline"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you handle conflicts with students or colleagues?",
    options: ["I try to understand both sides and resolve", "I address the issue directly", "I avoid conflict when possible", "I become defensive"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do students experience you as a teacher?",
    options: ["Supportive and inspiring", "Helpful and structured", "Strict and instructional", "Distant or authoritative"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "Beyond teaching, I…",
    options: ["Actively contribute to student development and society", "Participate when opportunities arise", "Focus mainly on classroom duties", "Rarely engage beyond my role"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "How do you view your role as an educator?",
    options: ["A leader shaping future citizens", "A guide for academic success", "A subject expert", "A job responsibility"],
    scores: [5, 4, 3, 2]
  },
  {
    q: "What impact do you aim to create?",
    options: ["Transform lives and build character", "Support student growth", "Ensure academic performance", "Complete syllabus effectively"],
    scores: [5, 4, 3, 2]
  }
];

const results = [
  {
    min: 91,
    max: 100,
    icon: "🔥",
    badge: "TRANSFORMATIONAL LEADER",
    title: "You Are a <span>Transformational Leader</span>",
    levelLabel: "Level 5 (91–100)",
    welcome: "Welcome to the Living Leadership Family. You are not just an educator… You are a life shaper. Your students don't just remember lessons — They remember who they became because of you.",
    realityTitle: "Your Leadership Reality",
    reality: "You demonstrate strong character, emotional intelligence, and purpose-driven leadership. You are building something bigger than a classroom.",
    blindSpotTitle: "Your Blind Spot",
    blindSpot: "Even at this level: Impact must become legacy.",
    growthTitle: "Your Growth Journey",
    growth: ["Mentoring educators", "Building leadership systems", "Expanding societal impact"],
    reflectionTitle: "Personal Reflection",
    reflection: ["How can I build leaders who build others?", "What impact will continue after me?"],
    commitment: "Lead Beyond Yourself",
    tips: [
      { h: "Leadership Reality", b: "Strong character, emotional intelligence, purpose-driven leadership" },
      { h: "Blind Spot", b: "Impact must become legacy" },
      { h: "Growth Journey", b: "Mentoring educators, building leadership systems, expanding societal impact" },
      { h: "Personal Reflection", b: "How can I build leaders who build others?" }
    ]
  },
  {
    min: 76,
    max: 90,
    icon: "🌟",
    badge: "INFLUENTIAL EDUCATOR",
    title: "You Are an <span>Influential Educator</span>",
    levelLabel: "Level 4 (76–90)",
    welcome: "Welcome to the Living Leadership Family. You are not just teaching… You are shaping lives. Students remember you. They are influenced by you. That is rare and powerful.",
    realityTitle: "Your Leadership Reality",
    reality: "You demonstrate strong communication, leadership presence, and the ability to inspire. You are already a leader in your environment.",
    blindSpotTitle: "Your Blind Spot",
    blindSpot: "But leadership at this level demands more: Influence must become impact.",
    growthTitle: "Your Growth Journey",
    growth: ["Mentoring students as leaders", "Expanding influence beyond classroom", "Creating systems of impact"],
    reflectionTitle: "Personal Reflection",
    reflection: ["Who is becoming a leader because of me?", "What legacy am I building as an educator?"],
    commitment: "Multiply Your Leadership Impact",
    tips: [
      { h: "Leadership Reality", b: "Strong communication, leadership presence, ability to inspire" },
      { h: "Blind Spot", b: "Influence must become impact" },
      { h: "Growth Journey", b: "Mentoring students as leaders, expanding influence, creating systems of impact" },
      { h: "Personal Reflection", b: "Who is becoming a leader because of me?" }
    ]
  },
  {
    min: 61,
    max: 75,
    icon: "🌳",
    badge: "ENGAGING EDUCATOR",
    title: "You Are an <span>Engaging Educator</span>",
    levelLabel: "Level 3 (61–75)",
    welcome: "Welcome to the Living Leadership Family. Students don't just learn from you… They feel connected to you. Your classroom has life. Your presence has warmth. And that is powerful.",
    realityTitle: "Your Leadership Reality",
    reality: "You are strong in student connection, responsibility, and engagement. You are already influencing — whether you realize it or not.",
    blindSpotTitle: "Your Blind Spot",
    blindSpot: "You are engaging students… But are you developing leaders?",
    growthTitle: "Your Growth Journey",
    growth: ["Leadership expansion", "Influence beyond classroom", "Student leadership development"],
    reflectionTitle: "Personal Reflection",
    reflection: ["Am I creating followers or future leaders?", "How far does my influence go beyond my class?"],
    commitment: "Step Into Leadership Influence",
    tips: [
      { h: "Leadership Reality", b: "Strong student connection, responsibility, and engagement" },
      { h: "Blind Spot", b: "Engaging students — but are you developing leaders?" },
      { h: "Growth Journey", b: "Leadership expansion, influence beyond classroom, student leadership development" },
      { h: "Personal Reflection", b: "Am I creating followers or future leaders?" }
    ]
  },
  {
    min: 41,
    max: 60,
    icon: "🌿",
    badge: "DEVELOPING EDUCATOR",
    title: "You Are a <span>Developing Educator</span>",
    levelLabel: "Level 2 (41–60)",
    welcome: "Welcome to the Living Leadership Family. You are growing. You are trying. You are becoming aware. And that's a powerful place to be. You are no longer just teaching… You are beginning to think like a leader.",
    realityTitle: "Your Leadership Reality",
    reality: "You are improving your teaching and beginning reflection. You care. You are making an effort. But consistency is still forming.",
    blindSpotTitle: "Your Blind Spot",
    blindSpot: "Inconsistent leadership behavior, emotional reactions under pressure, and limited relational depth.",
    growthTitle: "Your Growth Journey",
    growth: ["Consistency in behavior", "Stronger emotional control", "Deeper student relationships"],
    reflectionTitle: "Personal Reflection",
    reflection: ["When I am stressed, do I respond or react?", "Do my students trust me or just listen to me?"],
    commitment: "Unlock Your Next Level as an Educator",
    tips: [
      { h: "Leadership Reality", b: "Improving teaching, beginning reflection, making consistent effort" },
      { h: "Blind Spot", b: "Inconsistent leadership behavior, emotional reactions under pressure" },
      { h: "Growth Journey", b: "Consistency in behavior, stronger emotional control, deeper student relationships" },
      { h: "Personal Reflection", b: "Do my students trust me or just listen to me?" }
    ]
  },
  {
    min: 0,
    max: 40,
    icon: "🌱",
    badge: "INSTRUCTOR",
    title: "You Are an <span>Instructor</span>",
    levelLabel: "Level 1 (0–40)",
    welcome: "Welcome to the Living Leadership Family. You are showing up. You are teaching. You are doing your responsibility. And that matters more than you think. But deep inside… there may be a question: \"Am I truly impacting my students… or just completing lessons?\"",
    realityTitle: "Your Leadership Reality",
    reality: "Right now, your focus is on content delivery. Your classroom is functional — but leadership is still developing. Students are learning subjects… But are they learning from you?",
    blindSpotTitle: "Your Blind Spot",
    blindSpot: "Limited leadership awareness, low emotional connection, and reactive teaching under pressure.",
    growthTitle: "Your Growth Journey",
    growth: ["Mindset shift (Teacher → Leader)", "Emotional intelligence", "Awareness of student needs"],
    reflectionTitle: "Personal Reflection",
    reflection: ["What do my students feel when they enter my class?", "Do they remember my lessons… or my impact?"],
    commitment: "Start Your Leadership Transformation",
    tips: [
      { h: "Leadership Reality", b: "Focus on content delivery; classroom is functional but leadership is developing" },
      { h: "Blind Spot", b: "Limited leadership awareness, low emotional connection, reactive under pressure" },
      { h: "Growth Journey", b: "Mindset shift to leader, emotional intelligence, awareness of student needs" },
      { h: "Personal Reflection", b: "Do they remember my lessons… or my impact?" }
    ]
  }
];


export default function TeacherQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(12).fill(null));
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userState, setUserState] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userPincode, setUserPincode] = useState('');
  const [userOrganization, setUserOrganization] = useState('');
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
    if (!userState.trim()) {
      alert('Please enter your state.');
      return;
    }
    if (!userCity.trim()) {
      alert('Please enter your city.');
      return;
    }
    if (!userPincode.trim()) {
      alert('Please enter your pincode.');
      return;
    }
    if (!userOrganization.trim()) {
      alert('Please enter your organization/institution.');
      return;
    }

    const totalScore = answers.reduce((sum, a, i) => a !== null ? sum + questions[i].scores[a] : sum, 0);
    const scaledScore = Math.round((totalScore / 60) * 100);
    const AssessmentResult = results.find(r => scaledScore >= r.min && scaledScore <= r.max) || results[4];
    setResult(AssessmentResult);
    setShowResult(true);

    sendResultEmail(userName, userEmail, userPhone, userState, userCity, userPincode, userOrganization, scaledScore, AssessmentResult, answers);
  };

  const sendResultEmail = async (name, email, phone, state, city, pincode, organization, score, result, ans) => {
    setEmailStatus('📧 Sending results...');

    const answerDetails = questions.map((q, i) => {
      const chosen = q.options[ans[i]];
      const pts = q.scores[ans[i]];
      return `Q${i + 1}: ${q.q}\n   Answer: ${chosen} (${pts} pts)`;
    }).join('\n\n');

    const emailBody = `
NEW Assessment RESULT — ${ASSESSMENT_TYPE}
=====================================
Name: ${name}
Email: ${email}
Phone: ${phone}
State: ${state}
City: ${city}
Pincode: ${pincode}
Organization/Institution: ${organization}
Assessment: ${ASSESSMENT_TYPE}
Total Score: ${score} / 100
Leadership Profile: ${result.badge}
Date: ${new Date().toLocaleString('en-IN')}

DETAILED ANSWERS:
${answerDetails}

PROFILE SUMMARY:
${result.welcome}

Blind Spot: ${result.blindSpot}
Growth Journey: ${result.growth.join(', ')}
Commitment: ${result.commitment}
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
    setUserState('');
    setUserCity('');
    setUserPincode('');
    setUserOrganization('');
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
              alt="Teacher Leadership"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1832]/90 via-[#0b1832]/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm md:text-base font-semibold">Teacher Leadership</p>
              <p className="text-xs md:text-sm text-[#d3d8ee]">Take the Assessment to evaluate your educator leadership.</p>
            </div>
          </aside>
          <section className="bg-[#111e3d] border border-[rgba(245,197,24,0.12)] rounded-3xl p-6 lg:p-8">
        {/* Quiz Header */}
        <div className="text-center mb-6 mt-2">
          <a href="/Assessment" className="inline-flex items-center gap-2 text-[#8fa0c0] text-sm no-underline mb-6 hover:text-[#f5c518] transition-colors">
            ← Back to Assessment Selection
          </a>
          <div className="inline-flex items-center gap-2 bg-[rgba(245,197,24,0.1)] border border-[rgba(245,197,24,0.3)] text-[#f5c518] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            👩‍🏫 Teacher Leadership Assessment
          </div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-black mb-2 leading-tight">
            Discover Your <span className="text-[#f5c518]">Teaching Leadership</span>
          </h1>
          <p className="text-[#8fa0c0] text-sm leading-relaxed max-w-md mx-auto">
            Answer 12 questions to uncover your leadership style as an educator.
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
                <div>
                  <label className="block text-xs font-semibold text-[#f5c518] uppercase tracking-wide mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={userState}
                    onChange={(e) => setUserState(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white text-sm font-['DM_Sans'] outline-none focus:border-[#f5c518] transition-colors"
                    placeholder="Enter your state"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#f5c518] uppercase tracking-wide mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white text-sm font-['DM_Sans'] outline-none focus:border-[#f5c518] transition-colors"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#f5c518] uppercase tracking-wide mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={userPincode}
                    onChange={(e) => setUserPincode(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white text-sm font-['DM_Sans'] outline-none focus:border-[#f5c518] transition-colors"
                    placeholder="Enter your pincode"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#f5c518] uppercase tracking-wide mb-2">
                    Organization/Institution
                  </label>
                  <input
                    type="text"
                    value={userOrganization}
                    onChange={(e) => setUserOrganization(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.12)] rounded-xl px-4 py-3 text-white text-sm font-['DM_Sans'] outline-none focus:border-[#f5c518] transition-colors"
                    placeholder="Enter your organization/institution"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Card */}
        {showResult && result && (
          <div className="bg-[#111e3d] border-4 border-[#f5c518] rounded-3xl p-8 md:p-12 animate-fadeIn">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-5">{result.icon}</div>
              <div className="inline-block bg-[#f5c518] text-[#0d1b3e] text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-2xl mb-2">
                {result.badge}
              </div>
              <p className="text-[#8fa0c0] text-xs mb-4">{result.levelLabel}</p>
              <h2 className="font-['Playfair_Display'] text-3xl font-black mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: result.title }}></h2>
            </div>

            {/* What We See In You */}
            <div className="bg-[rgba(245,197,24,0.06)] border border-[rgba(245,197,24,0.2)] rounded-2xl p-6 mb-5">
              <h4 className="text-xs uppercase tracking-wider text-[#f5c518] font-semibold mb-3">What We See in You</h4>
              <p className="text-sm text-[#e8ecf5] leading-relaxed">{result.welcome}</p>
            </div>

            {/* 2-col: Reality + Blind Spot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5">
                <h4 className="text-xs uppercase tracking-wider text-[#f5c518] font-semibold mb-3">{result.realityTitle}</h4>
                <p className="text-sm text-[#e8ecf5] leading-relaxed">{result.reality}</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5">
                <h4 className="text-xs uppercase tracking-wider text-[#f5c518] font-semibold mb-3">{result.blindSpotTitle}</h4>
                <p className="text-sm text-[#e8ecf5] leading-relaxed">{result.blindSpot}</p>
              </div>
            </div>

            {/* Growth Journey */}
            <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 mb-5">
              <h4 className="text-xs uppercase tracking-wider text-[#f5c518] font-semibold mb-3">{result.growthTitle}</h4>
              <ul className="space-y-2">
                {result.growth.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#e8ecf5]">
                    <span className="text-[#f5c518] mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Reflection */}
            <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 mb-8">
              <h4 className="text-xs uppercase tracking-wider text-[#f5c518] font-semibold mb-3">{result.reflectionTitle}</h4>
              <ul className="space-y-2">
                {result.reflection.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#e8ecf5] italic">
                    <span className="text-[#f5c518] not-italic mt-0.5">●</span>
                    <span>"{item}"</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-[rgba(245,197,24,0.2)] mb-8"></div>

            {/* Commitment CTA */}
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-[#8fa0c0] mb-4 font-semibold">Your Commitment</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <a href="/CorporatePrograms" className="bg-[#f5c518] text-[#0d1b3e] px-6 py-3 rounded-2xl text-sm font-bold no-underline inline-block hover:bg-[#e6b800] transition-colors">
                  {result.commitment}
                </a>
                <button
                  onClick={retakeQuiz}
                  className="border-2 border-[rgba(245,197,24,0.4)] text-[#f5c518] px-5 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer bg-transparent hover:border-[#f5c518] transition-colors"
                >
                  Retake Assessment
                </button>
              </div>
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