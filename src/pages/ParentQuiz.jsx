import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

const ASSESSMENT_TYPE = "Parent Leadership Assessment";
const OWNER_EMAIL = "livingleadership7@gmail.com";
const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1648221350871-e3ae3c8d0f58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxwYXJlbnRzfGVufDB8fDB8fHww"; // Unsplash: family

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
    level: "Level 1",
    title: "You Are a <span>Reactive Parent</span>",
    journeyTitle: "Your Journey Begins Here",
    journeyBody: "Welcome to the Living Leadership Family.\n\nYou deeply care for your child. Your intentions are right.\n\nBut parenting right now may feel like responding to situations as they come — sometimes with patience… sometimes with pressure… sometimes with emotion.\n\nAnd that's human.\n\nBut here's the truth:\n👉 Your child is not just watching what you say… They are becoming what you model.",
    meaning: "Your parenting is currently shaped by situations, emotions, and immediate reactions. Your child is receiving guidance… but may not always feel consistent emotional safety.",
    remark: "Parenting is mostly situational and emotional reactions dominate. This is a common starting point, and with awareness, you can develop more intentional leadership in your parenting.",
    reflections: ["How does my child feel when I correct them?", "Am I reacting… or leading?"],
    nextStep: "Move from reacting → to raising with purpose.",
    tips: [
      { h: "Growth Edge", b: "Emotional reactions under stress, inconsistent responses, limited conscious parenting" },
      { h: "Next Level Path", b: "Emotional awareness · Pause before reaction · Intentional parenting choices" },
      { h: "Strengths", b: "Love for your child, basic care and good intentions" },
      { h: "Impact", b: "Building a stronger family foundation starts here" }
    ]
  },
  {
    min: 41,
    max: 60,
    icon: "🌿",
    badge: "MANAGING PARENT",
    level: "Level 2",
    title: "You Are a <span>Managing Parent</span>",
    journeyTitle: "Your Journey Begins Here",
    journeyBody: "Welcome to the Living Leadership Family.\n\nYou are trying to bring structure and discipline into your child's life. You care about doing things right.\n\nAnd that matters.\n\nBut sometimes, parenting may feel like managing behavior more than shaping the person.",
    meaning: "You provide rules, structure, and direction — but emotional connection may still need strengthening.",
    remark: "You provide structure and are growing in your awareness of parenting leadership. You balance discipline with care, creating a stable environment for your child.",
    reflections: ["Does my child open up to me freely?", "Do I focus more on behavior or their heart?"],
    nextStep: "Move from managing → to meaningful connection.",
    tips: [
      { h: "Growth Edge", b: "Focus more on control than connection, limited emotional depth, inconsistent awareness" },
      { h: "Next Level Path", b: "Build connection along with discipline · Listen more deeply · Understand before correcting" },
      { h: "Strengths", b: "Structure, growing awareness, commitment to discipline" },
      { h: "Impact", b: "Stable and supportive family environment" }
    ]
  },
  {
    min: 61,
    max: 75,
    icon: "🌳",
    badge: "SUPPORTIVE PARENT",
    level: "Level 3",
    title: "You Are a <span>Supportive Parent</span>",
    journeyTitle: "Your Journey Begins Here",
    journeyBody: "Welcome to the Living Leadership Family.\n\nYour child feels safe, supported, and encouraged around you. You are building something beautiful — a relationship based on trust.\n\nAnd that is powerful.",
    meaning: "You are strong in emotional connection, encouragement, and support. Your child feels valued. But here's the deeper question: 👉 Are you only supporting… or also shaping?",
    remark: "You build strong connections and encourage your child's development. Your parenting creates a nurturing environment that fosters growth and confidence.",
    reflections: ["Am I guiding my child or just supporting them?", "Am I preparing them for life or protecting them from it?"],
    nextStep: "Move from support → to intentional leadership.",
    tips: [
      { h: "Growth Edge", b: "Balance love with leadership, add structure and direction, build discipline with care" },
      { h: "Next Level Path", b: "Balance love with leadership · Add structure and direction · Build discipline with care" },
      { h: "Strengths", b: "Emotional connection, encouragement, trust-based relationship" },
      { h: "Impact", b: "Confident and emotionally connected child" }
    ]
  },
  {
    min: 76,
    max: 90,
    icon: "🌟",
    badge: "INTENTIONAL PARENT",
    level: "Level 4",
    title: "You Are an <span>Intentional Parent</span>",
    journeyTitle: "Your Journey Begins Here",
    journeyBody: "Welcome to the Living Leadership Family.\n\nYou are a conscious parent. You think. You reflect. You act with purpose.\n\nYour parenting is not accidental — it is intentional.\n\nAnd your child is already benefiting from it.",
    meaning: "You demonstrate awareness, values-based parenting, and emotional intelligence. You are shaping both character and confidence.",
    remark: "You practice conscious parenting, actively building values and leadership in your child. Your approach creates a strong foundation for character development.",
    reflections: ["What kind of adult am I preparing my child to become?", "What values will they carry for life?"],
    nextStep: "Move from intentional → to transformational parenting.",
    tips: [
      { h: "Growth Edge", b: "Expanding your impact beyond your home" },
      { h: "Next Level Path", b: "Build leadership in your child · Expose them to real-world responsibility · Create a value-driven family culture" },
      { h: "Strengths", b: "Conscious parenting, values focus, emotional intelligence" },
      { h: "Impact", b: "Character-driven family leadership" }
    ]
  },
  {
    min: 91,
    max: 100,
    icon: "🔥",
    badge: "TRANSFORMATIONAL PARENT",
    level: "Level 5",
    title: "You Are a <span>Transformational Parent</span>",
    journeyTitle: "Your Journey Begins Here",
    journeyBody: "Welcome to the Living Leadership Family.\n\nYou are not just raising a child…\n👉 You are shaping a future leader.\n\nYour parenting reflects purpose, clarity, and deep responsibility.\n\nYour child is learning how to think, how to lead, and how to live.",
    meaning: "You demonstrate strong values, emotional intelligence, and leadership-driven parenting. You are building something that goes beyond your family.",
    remark: "You shape character deeply and raise future leaders. Your parenting goes beyond the family, influencing society through the values and leadership you instill.",
    reflections: ["How can my parenting influence others?", "What legacy am I leaving through my child?"],
    nextStep: "Lead beyond your family.",
    tips: [
      { h: "Growth Edge", b: "Impact must become legacy — your influence can extend to your community and beyond" },
      { h: "Next Level Path", b: "Mentor other parents · Build systems at home · Expand influence into community" },
      { h: "Strengths", b: "Deep character shaping, leadership focus, values-driven parenting" },
      { h: "Impact", b: "Raising societal leaders and change-makers" }
    ]
  }
];


/* ─────────────────────────────────────────
   CERTIFICATE STYLES (injected as <style>)
───────────────────────────────────────── */
const certCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');

  @keyframes certIn {
    0%   { opacity:0; transform:scale(0.86) translateY(28px); }
    65%  { opacity:1; transform:scale(1.02) translateY(-4px); }
    100% { opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes shimmerMove {
    0%   { background-position: -500px 0; }
    100% { background-position: 500px 0; }
  }
  @keyframes sealGlow {
    0%,100% { box-shadow: 0 0 0 0 rgba(201,162,39,0.5), 0 6px 24px rgba(0,0,0,0.4); }
    50%      { box-shadow: 0 0 0 10px rgba(201,162,39,0), 0 6px 24px rgba(0,0,0,0.4); }
  }
  @keyframes dotPulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.5; transform:scale(0.7); }
  }

  .cert-root { animation: certIn 0.75s cubic-bezier(.22,.68,0,1.2) both; }

  .cert-card {
    position: relative;
    background: linear-gradient(160deg,#fffef8 0%,#fdf6e3 35%,#fef8ed 65%,#fffdf7 100%);
    border-radius: 22px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px #c9a227,
      0 0 0 6px rgba(201,162,39,0.14),
      0 32px 90px rgba(0,0,0,0.38),
      inset 0 1px 0 rgba(255,255,255,0.95);
  }

  .cert-ring1 {
    position:absolute; inset:10px;
    border:2px solid rgba(201,162,39,0.55);
    border-radius:14px; pointer-events:none; z-index:2;
  }
  .cert-ring2 {
    position:absolute; inset:15px;
    border:1px solid rgba(201,162,39,0.22);
    border-radius:10px; pointer-events:none; z-index:2;
  }

  .cert-texture {
    position:absolute; inset:0; pointer-events:none; z-index:0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 28px, rgba(201,162,39,0.04) 28px, rgba(201,162,39,0.04) 29px
    );
  }

  .cert-watermark {
    position:absolute; inset:0; z-index:0; pointer-events:none;
    display:flex; align-items:center; justify-content:center;
    font-family:'Cinzel',serif; font-size:200px; font-weight:900;
    color:#8a6a00; opacity:0.03; user-select:none; letter-spacing:-6px;
    line-height:1;
  }

  .cert-corner { position:absolute; width:56px; height:56px; z-index:3; }
  .cert-corner svg { width:100%; height:100%; }
  .cert-corner.tl { top:20px; left:20px; }
  .cert-corner.tr { top:20px; right:20px; transform:scaleX(-1); }
  .cert-corner.bl { bottom:20px; left:20px; transform:scaleY(-1); }
  .cert-corner.br { bottom:20px; right:20px; transform:scale(-1,-1); }

  .cert-shimmer {
    height:4px; position:relative; z-index:10; border-radius:22px 22px 0 0;
    background:linear-gradient(90deg,#8a6200,#d4a800,#ffe566,#f5c518,#d4a800,#8a6200);
    background-size:500px 100%; animation:shimmerMove 3s linear infinite;
  }

  .cert-header {
    position:relative; z-index:5;
    background:linear-gradient(135deg,#09152c 0%,#0d1b3e 45%,#13224a 100%);
    padding:24px 36px 22px;
    display:flex; align-items:center; justify-content:space-between; gap:16px;
    flex-wrap:wrap;
  }
  .cert-header::after {
    content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg,transparent,#f5c518 20%,#c9a227 50%,#f5c518 80%,transparent);
  }

  .cert-logo-row { display:flex; align-items:center; gap:14px; }
  .cert-logo-img {
    width:54px; height:54px; border-radius:11px;
    border:2px solid #c9a227; object-fit:cover; flex-shrink:0;
    box-shadow:0 4px 14px rgba(0,0,0,0.4);
  }
  .cert-logo-name {
    font-family:'Cinzel',serif; font-size:16px; font-weight:700;
    color:#f5c518; letter-spacing:0.5px; line-height:1.2; display:block;
  }
  .cert-logo-tagline {
    font-family:'DM Sans',sans-serif; font-size:9px;
    letter-spacing:2.5px; text-transform:uppercase;
    color:rgba(245,197,24,0.5); display:block; margin-top:3px;
  }
  .cert-header-right { text-align:right; }
  .cert-cert-of {
    font-family:'DM Sans',sans-serif; font-size:9px;
    letter-spacing:3px; text-transform:uppercase; color:rgba(245,197,24,0.45);
    display:block; margin-bottom:3px;
  }
  .cert-cert-title {
    font-family:'Cinzel',serif; font-size:14px; font-weight:700;
    color:#f5c518; letter-spacing:1px;
  }

  .cert-body {
    position:relative; z-index:4;
    padding:40px 52px 36px; text-align:center;
  }

  .cert-certifies-line {
    font-family:'Playfair Display',serif; font-style:italic;
    font-size:13px; color:rgba(122,95,0,0.75); letter-spacing:1.5px;
    margin-bottom:12px; display:block;
  }

  .cert-name {
    font-family:'Cinzel',serif; font-weight:700;
    font-size:clamp(24px,4.5vw,38px); line-height:1.15;
    background:linear-gradient(135deg,#7a4f00 0%,#b8860b 35%,#d4a800 55%,#8a6200 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    margin-bottom:6px; display:block; letter-spacing:0.5px;
  }

  .cert-org-line {
    font-family:'DM Sans',sans-serif; font-size:11px;
    color:#8a7040; letter-spacing:1px; margin-bottom:22px; display:block;
  }

  .cert-orn {
    display:flex; align-items:center; gap:10px;
    max-width:460px; margin:0 auto 22px;
  }
  .cert-orn-line {
    flex:1; height:1px;
    background:linear-gradient(90deg,transparent,#c9a227 40%,#c9a227 60%,transparent);
  }
  .cert-orn-star { font-size:13px; color:#c9a227; line-height:1; }

  .cert-badge {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg,#09152c,#0d1b3e,#13224a);
    border:1.5px solid #c9a227; border-radius:40px;
    padding:9px 26px; margin-bottom:18px;
    box-shadow:0 4px 20px rgba(201,162,39,0.25);
  }
  .cert-badge-icon { font-size:18px; line-height:1; }
  .cert-badge-text {
    font-family:'Cinzel',serif; font-size:11px; font-weight:700;
    color:#f5c518; letter-spacing:3px; text-transform:uppercase;
  }
  .cert-badge-dot {
    width:7px; height:7px; border-radius:50%; background:#f5c518;
    animation:dotPulse 2s ease-in-out infinite;
  }

  .cert-profile-title {
    font-family:'Playfair Display',serif; font-weight:700;
    font-size:clamp(20px,3.5vw,30px); line-height:1.25;
    color:#1a1000; margin-bottom:16px;
  }
  .cert-profile-title span { color:#b8860b; }

  .cert-remark {
    font-family:'DM Sans',sans-serif; font-size:13.5px;
    color:#3d2e00; line-height:1.9; max-width:500px; margin:0 auto 28px;
  }

  .cert-insights-title {
    font-family:'Cinzel',serif; font-size:9px;
    letter-spacing:3.5px; text-transform:uppercase;
    color:#8a6200; margin-bottom:16px; display:block;
  }
  .cert-insights-grid {
    display:grid; grid-template-columns:1fr 1fr; gap:10px;
    max-width:500px; margin:0 auto 28px; text-align:left;
  }
  .cert-insight {
    background:rgba(201,162,39,0.07);
    border:1px solid rgba(201,162,39,0.32);
    border-radius:10px; padding:13px 15px;
  }
  .cert-insight-h {
    font-family:'Cinzel',serif; font-size:8px; font-weight:700;
    letter-spacing:1.5px; text-transform:uppercase;
    color:#8a6200; display:block; margin-bottom:5px;
  }
  .cert-insight-b {
    font-family:'DM Sans',sans-serif; font-size:12px;
    color:#3d2e00; line-height:1.55;
  }

  .cert-assessment-note {
    font-family:'DM Sans',sans-serif; font-size:10px;
    color:rgba(122,95,0,0.6); letter-spacing:0.8px; margin-top:6px;
  }

  .cert-footer {
    position:relative; z-index:5;
    background:linear-gradient(135deg,#09152c 0%,#0d1b3e 45%,#13224a 100%);
    border-top:2px solid #c9a227;
    padding:20px 48px;
    display:flex; align-items:center; justify-content:space-between; gap:16px;
    border-radius:0 0 20px 20px;
  }

  .cert-sig { text-align:center; }
  .cert-sig-name {
    font-family:'Playfair Display',serif; font-style:italic;
    font-size:15px; color:#f5c518; display:block; margin-bottom:6px;
  }
  .cert-sig-line {
    width:130px; height:1px;
    background:linear-gradient(90deg,transparent,rgba(245,197,24,0.5),transparent);
    margin:0 auto 6px;
  }
  .cert-sig-role {
    font-family:'DM Sans',sans-serif; font-size:9px;
    letter-spacing:2px; text-transform:uppercase;
    color:rgba(245,197,24,0.45);
  }

  .cert-seal {
    width:72px; height:72px; border-radius:50%;
    background:radial-gradient(circle,#1e3060 0%,#0a1630 100%);
    border:2px solid #c9a227;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    flex-shrink:0;
    animation:sealGlow 3s ease-in-out infinite;
  }
  .cert-seal-icon { font-size:26px; line-height:1; display:block; }
  .cert-seal-label {
    font-family:'Cinzel',serif; font-size:6px; font-weight:700;
    color:#c9a227; letter-spacing:1.5px; text-transform:uppercase; margin-top:3px;
  }

  .cert-date { text-align:right; }
  .cert-date-label {
    font-family:'DM Sans',sans-serif; font-size:9px;
    letter-spacing:2px; text-transform:uppercase;
    color:rgba(245,197,24,0.45); display:block; margin-bottom:4px;
  }
  .cert-date-value {
    font-family:'Cinzel',serif; font-size:12px; font-weight:600; color:#f5c518;
  }

  .cert-actions {
    display:flex; justify-content:center; gap:14px; flex-wrap:wrap; margin-top:22px;
  }
  .cert-btn-enroll {
    background:linear-gradient(135deg,#f5c518,#e6b800);
    color:#0d1b3e; padding:13px 34px; border-radius:40px;
    font-family:'DM Sans',sans-serif; font-size:14px; font-weight:700;
    text-decoration:none; display:inline-block; border:none; cursor:pointer;
    box-shadow:0 6px 28px rgba(245,197,24,0.32);
    transition:transform 0.2s,box-shadow 0.2s;
  }
  .cert-btn-enroll:hover { transform:translateY(-2px); box-shadow:0 10px 36px rgba(245,197,24,0.42); }
  .cert-btn-retake {
    background:transparent; color:#f5c518; padding:12px 28px; border-radius:40px;
    font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600;
    border:1.5px solid rgba(245,197,24,0.4); cursor:pointer;
    transition:border-color 0.2s,background 0.2s;
  }
  .cert-btn-retake:hover { border-color:#f5c518; background:rgba(245,197,24,0.06); }

  .cert-website-note {
    text-align:center; margin-top:14px;
    font-family:'DM Sans',sans-serif; font-size:10px;
    letter-spacing:1.5px; text-transform:uppercase;
    color:rgba(245,197,24,0.3);
  }

  @media(max-width:620px){
    .cert-header{ padding:18px 20px; }
    .cert-body{ padding:30px 22px 26px; }
    .cert-insights-grid{ grid-template-columns:1fr; }
    .cert-footer{ padding:18px 22px; flex-direction:column; align-items:center; text-align:center; }
    .cert-sig{ display:none; }
    .cert-date{ text-align:center; }
    .cert-corner{ width:40px; height:40px; }
    .cert-corner.tl{ top:14px; left:14px; }
    .cert-corner.tr{ top:14px; right:14px; }
    .cert-corner.bl{ bottom:14px; left:14px; }
    .cert-corner.br{ bottom:14px; right:14px; }
  }
`;

/* SVG corner ornament component */
const Corner = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3 L26 3 L26 7 L7 7 L7 26 L3 26 Z" fill="#c9a227" opacity="0.75"/>
    <path d="M5 5 L22 5 L22 8 L8 8 L8 22 L5 22 Z" fill="none" stroke="#c9a227" strokeWidth="0.75" opacity="0.45"/>
    <circle cx="4.5" cy="4.5" r="3.5" fill="#c9a227" opacity="0.85"/>
    <circle cx="26" cy="4.5" r="1.8" fill="#c9a227" opacity="0.55"/>
    <circle cx="4.5" cy="26" r="1.8" fill="#c9a227" opacity="0.55"/>
    <path d="M30 3 L33 3 L33 5 L30 5 Z" fill="#c9a227" opacity="0.35"/>
    <path d="M3 30 L5 30 L5 33 L3 33 Z" fill="#c9a227" opacity="0.35"/>
    <path d="M30 6 L32 6 L32 7.5 L30 7.5 Z" fill="#c9a227" opacity="0.2"/>
    <path d="M6 30 L7.5 30 L7.5 32 L6 32 Z" fill="#c9a227" opacity="0.2"/>
  </svg>
);

export default function ParentQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(15).fill(null));
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userState, setUserState] = useState('');
  const [userCity, setUserCity] = useState('');
  const [userPincode, setUserPincode] = useState('');
  const [userOrganization, setUserOrganization] = useState('');
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
    if (current < 15) setCurrent(current + 1);
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
    const scaledScore = Math.round((totalScore / 72) * 100);
    const assessmentResult = results.find(r => scaledScore >= r.min && scaledScore <= r.max) || results[0];
    setResult(assessmentResult);
    setFinalScore(scaledScore);
    setShowResult(true);

    sendResultEmail(userName, userEmail, userPhone, userState, userCity, userPincode, userOrganization, scaledScore, assessmentResult, answers);
  };

  const sendResultEmail = async (name, email, phone, state, city, pincode, organization, score, result, ans) => {
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
    setAnswers(Array(15).fill(null));
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserState('');
    setUserCity('');
    setUserPincode('');
    setUserOrganization('');
    setShowResult(false);
    setResult(null);
    setFinalScore(0);
    setEmailStatus('');
  };

  const progressPercent = ((current + 1) / 16) * 100;
  const currentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen relative text-white font-['DM_Sans'] overflow-hidden">
      <style>{certCSS}</style>
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
              <span className="text-xs font-semibold text-[#f5c518]">{Math.min(current + 1, 16)} of 16</span>
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
          {!showResult && current < 15 && (
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
                Question {Math.min(current + 1, 16)} of 16
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
          {!showResult && current === 15 && (
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
                Question 16 of 16
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

        {/* Result Certificate */}
        {showResult && result && (
          <div className="cert-root">
            <div className="cert-card">
              {/* Animated shimmer top bar */}
              <div className="cert-shimmer"></div>

              {/* Decorative layers */}
              <div className="cert-texture" aria-hidden="true"></div>
              <div className="cert-ring1" aria-hidden="true"></div>
              <div className="cert-ring2" aria-hidden="true"></div>
              <div className="cert-watermark" aria-hidden="true">LLA</div>

              {/* Corner ornaments */}
              <div className="cert-corner tl"><Corner/></div>
              <div className="cert-corner tr"><Corner/></div>
              <div className="cert-corner bl"><Corner/></div>
              <div className="cert-corner br"><Corner/></div>

              {/* ── HEADER ── */}
              <div className="cert-header">
                <div className="cert-logo-row">
                  <img src="/Logo.jpeg" alt="Living Leadership Academy" className="cert-logo-img"/>
                  <div>
                    <span className="cert-logo-name">Living Leadership</span>
                    <span className="cert-logo-tagline">Academy · India</span>
                  </div>
                </div>
                <div className="cert-header-right">
                  <span className="cert-cert-of">Certificate of</span>
                  <span className="cert-cert-title">Leadership Profile</span>
                </div>
              </div>

              {/* ── BODY ── */}
              <div className="cert-body">
                <span className="cert-certifies-line">— This certifies that —</span>

                <span className="cert-name">{userName}</span>

                <span className="cert-org-line">
                  {userOrganization && <>{userOrganization} &nbsp;·&nbsp; </>}
                  {userCity && userState ? `${userCity}, ${userState}` : (userCity || userState)}
                </span>

                {/* Ornament divider */}
                <div className="cert-orn">
                  <div className="cert-orn-line"></div>
                  <span className="cert-orn-star">✦</span>
                  <div className="cert-orn-line"></div>
                  <span className="cert-orn-star">✦</span>
                  <div className="cert-orn-line"></div>
                </div>

                {/* Badge */}
                <div style={{marginBottom:'16px'}}>
                  <div className="cert-badge">
                    <span className="cert-badge-dot"></span>
                    <span className="cert-badge-icon">{result.icon}</span>
                    <span className="cert-badge-text">{result.badge}</span>
                    <span className="cert-badge-dot"></span>
                  </div>
                </div>

                {/* Profile title */}
                <h3 className="cert-profile-title" dangerouslySetInnerHTML={{ __html: result.title }}/>

                {/* Ornament divider */}
                <div className="cert-orn">
                  <div className="cert-orn-line"></div>
                  <span className="cert-orn-star">✦</span>
                  <div className="cert-orn-line"></div>
                  <span className="cert-orn-star">✦</span>
                  <div className="cert-orn-line"></div>
                </div>

                {/* Remark */}
                <p className="cert-remark">{result.remark.replace(/<[^>]+>/g,'')}</p>

                {/* Insights */}
                <span className="cert-insights-title">✦ &nbsp; Leadership Insights &nbsp; ✦</span>
                <div className="cert-insights-grid">
                  {result.tips.map((tip,i)=>(
                    <div key={i} className="cert-insight">
                      <span className="cert-insight-h">{tip.h}</span>
                      <span className="cert-insight-b">{tip.b}</span>
                    </div>
                  ))}
                </div>

                {/* Assessment note */}
                <p className="cert-assessment-note">
                  {ASSESSMENT_TYPE} &nbsp;·&nbsp; www.livingleadershipacademy.com
                </p>
              </div>

              {/* ── FOOTER ── */}
              <div className="cert-footer">
                <div className="cert-sig">
                  <span className="cert-sig-name">Satheesh Kumar S</span>
                  <div className="cert-sig-line"></div>
                  <span className="cert-sig-role">Founder &amp; CEO</span>
                </div>
                <div className="cert-seal">
                  <span className="cert-seal-icon">🦁</span>
                  <span className="cert-seal-label">Official</span>
                </div>
                <div className="cert-date">
                  <span className="cert-date-label">Issued on</span>
                  <span className="cert-date-value">{currentDate}</span>
                </div>
              </div>

            </div>{/* end .cert-card */}

            {/* Action buttons */}
            <div className="cert-actions">
              <a href="/FamilyPrograms" className="cert-btn-enroll">Start Your Leadership Transformation →</a>
              <button onClick={retakeQuiz} className="cert-btn-retake">Retake Assessment</button>
            </div>

            <p className="cert-website-note">www.livingleadershipacademy.com</p>
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
            {current < 15 ? (
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
