import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

export default function Quiz() {
  return (
    <div className="min-h-screen bg-[#0d1b3e]">
      <Navbar />
      <style>
        {`
          :root {
            --navy: #0d1b3e;
            --navy2: #0a1630;
            --navy3: #162040;
            --gold: #f5c518;
            --gold2: #e6b800;
            --white: #ffffff;
            --light: #e8ecf5;
            --muted: #8fa0c0;
            --card-bg: #111e3d;
          }

          /* HERO */
          .hero {
            text-align: center;
            padding: 80px 40px 60px;
            position: relative;
            overflow: hidden;
          }
          .hero::before {
            content: '';
            position: absolute;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(245, 197, 24, 0.07) 0%, transparent 70%);
            pointer-events: none;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(245, 197, 24, 0.1);
            border: 1px solid rgba(245, 197, 24, 0.3);
            color: var(--gold);
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 12px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 28px;
          }
          .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(40px, 6vw, 72px);
            font-weight: 900;
            line-height: 1.1;
            margin-bottom: 20px;
          }
          .hero h1 span { color: var(--gold); }
          .hero p {
            font-size: 18px;
            color: var(--muted);
            max-width: 600px;
            margin: 0 auto 16px;
            line-height: 1.7;
          }
          .hero-note {
            font-size: 14px;
            color: rgba(143, 160, 192, 0.7);
            margin-top: 8px;
          }

          /* STATS BAR */
          .stats-bar {
            display: flex;
            justify-content: center;
            gap: 60px;
            padding: 32px 40px;
            background: var(--navy3);
            border-top: 1px solid rgba(245, 197, 24, 0.1);
            border-bottom: 1px solid rgba(245, 197, 24, 0.1);
            flex-wrap: wrap;
          }
          .stat { text-align: center; }
          .stat-num {
            font-family: 'Playfair Display', serif;
            font-size: 30px;
            font-weight: 700;
            color: var(--gold);
          }
          .stat-label {
            font-size: 11px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--muted);
            margin-top: 2px;
          }

          /* Quiz GRID */
          .Quiz-section { padding: 70px 40px; }
          .section-label {
            text-align: center;
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--gold);
            font-weight: 600;
            margin-bottom: 12px;
          }
          .section-title {
            text-align: center;
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .section-sub {
            text-align: center;
            color: var(--muted);
            font-size: 15px;
            margin-bottom: 56px;
          }
          .Quiz-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 28px;
            max-width: 1100px;
            margin: 0 auto;
          }

          /* Quiz CARD */
          .Quiz-card {
            background: var(--card-bg);
            border: 1px solid rgba(245, 197, 24, 0.12);
            border-radius: 20px;
            padding: 0;
            cursor: pointer;
            text-decoration: none;
            display: block;
            position: relative;
            overflow: hidden;
            transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          }
          .Quiz-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--gold);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s;
            z-index: 10;
          }
          .Quiz-card:hover {
            transform: translateY(-6px);
            border-color: rgba(245, 197, 24, 0.4);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          }
          .Quiz-card:hover::before { transform: scaleX(1); }

          /* CARD IMAGE WRAPPER */
          .card-image-wrapper {
            position: relative;
            width: 100%;
            height: 160px;
            overflow: hidden;
            border-radius: 20px 20px 0 0;
          }
          .card-image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px 20px 0 0;
            transition: transform 0.4s ease;
            display: block;
          }
          .Quiz-card:hover .card-image-wrapper img {
            transform: scale(1.05);
          }
          /* Dark gradient overlay on image */
          .card-image-wrapper::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to bottom,
              rgba(13, 27, 62, 0.2) 0%,
              rgba(13, 27, 62, 0.55) 100%
            );
            border-radius: 20px 20px 0 0;
            pointer-events: none;
          }
          /* Emoji icon on top of image */
          .card-image-icon {
            position: absolute;
            top: 12px;
            left: 14px;
            z-index: 5;
            font-size: 22px;
            background: rgba(13, 27, 62, 0.65);
            border: 1px solid rgba(245, 197, 24, 0.35);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            border-radius: 10px;
            padding: 5px 9px;
            line-height: 1;
          }
          /* Audience pill on image top-right */
          .card-audience {
            position: absolute;
            top: 12px;
            right: 14px;
            z-index: 5;
            background: rgba(245, 197, 24, 0.15);
            border: 1px solid rgba(245, 197, 24, 0.35);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            color: var(--gold);
            font-size: 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 600;
          }

          /* CARD BODY */
          .card-body { padding: 26px 28px 28px; }
          .card-tag {
            font-size: 11px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--gold);
            font-weight: 600;
            margin-bottom: 10px;
          }
          .card-title {
            font-family: 'Playfair Display', serif;
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 10px;
            line-height: 1.2;
            color: #fff;
          }
          .card-desc {
            font-size: 13.5px;
            color: var(--muted);
            line-height: 1.7;
            margin-bottom: 20px;
          }
          .card-meta {
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 12px;
            color: var(--muted);
            margin-bottom: 18px;
          }
          .meta-dot {
            width: 4px;
            height: 4px;
            background: var(--gold);
            border-radius: 50%;
            opacity: 0.5;
          }
          .card-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--gold);
            font-weight: 600;
            font-size: 14px;
            transition: gap 0.2s;
          }
          .Quiz-card:hover .card-btn { gap: 12px; }

          /* HOW IT WORKS */
          .how-section {
            background: var(--navy3);
            padding: 70px 40px;
            border-top: 1px solid rgba(245, 197, 24, 0.08);
          }
          .steps-grid {
            display: flex;
            justify-content: center;
            gap: 0;
            max-width: 900px;
            margin: 0 auto;
            flex-wrap: wrap;
          }
          .step {
            flex: 1;
            min-width: 180px;
            text-align: center;
            padding: 24px 20px;
            position: relative;
          }
          .step:not(:last-child)::after {
            content: '→';
            position: absolute;
            right: -12px;
            top: 34px;
            color: var(--gold);
            opacity: 0.4;
            font-size: 20px;
          }
          .step-num {
            width: 48px;
            height: 48px;
            background: var(--gold);
            color: var(--navy2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 18px;
            margin: 0 auto 16px;
          }
          .step-title { font-weight: 600; font-size: 14px; margin-bottom: 8px; }
          .step-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

          @media (max-width: 768px) {
            .hero { padding: 60px 20px 40px; }
            .stats-bar { gap: 30px; }
            .Quiz-section, .how-section { padding: 50px 20px; }
            .steps-grid { flex-direction: column; align-items: center; }
            .step:not(:last-child)::after { display: none; }
          }
        `}
      </style>

      <section className="hero">
        <div className="badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Discover Your Leadership Style
        </div>
        <h1>Which <span>Leader</span><br />Are You?</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 0 }}>
          <Link to="/campus-Assessment" className="take-assessment-btn">
            Take Assessment
          </Link>
        </div>
        <p>Take our scientifically-designed leadership Assessments. 12 questions. Instant results. Personalized insights for your growth journey.</p>
        <p className="hero-note">Free · Takes 5–7 minutes · No signup required to take the Assessment</p>
      </section>

      <style>
        {`
          .take-assessment-btn {
            display: inline-block;
            padding: 15px 30px;
            margin-bottom: 12px;
            font-size: 15px;
            font-weight: 600;
            color: #0d1b3e;
            background: linear-gradient(90deg, #f5c518 0%, #ffe066 100%);
            border: none;
            border-radius: 24px;
            box-shadow: 0 0 8px 2px rgba(245,197,24,0.25);
            cursor: pointer;
            text-decoration: none;
            transition: box-shadow 0.18s, transform 0.18s, background 0.18s;
            outline: none;
            position: relative;
            z-index: 2;
          }
          .take-assessment-btn:hover, .take-assessment-btn:focus {
            background: linear-gradient(90deg, #ffe066 0%, #f5c518 100%);
            box-shadow: 0 0 16px 4px rgba(245,197,24,0.35);
            transform: translateY(-1px) scale(1.03);
          }
        `}
      </style>

      <div className="stats-bar">
        <div className="stat"><div className="stat-num">1,000+</div><div className="stat-label">Schools Visited</div></div>
        <div className="stat"><div className="stat-num">10,000+</div><div className="stat-label">Teachers Empowered</div></div>
        <div className="stat"><div className="stat-num">100,000+</div><div className="stat-label">Students Impacted</div></div>
        <div className="stat"><div className="stat-num">14+</div><div className="stat-label">Years of Excellence</div></div>
      </div>

      <section className="Quiz-section">
        <div className="section-label">Choose Your Assessment</div>
        <h2 className="section-title">4 Paths. One Mission.</h2>
        <p className="section-sub">Select the Assessment that matches your role — crafted specifically for your leadership journey.</p>

        <div className="Quiz-grid">

          {/* STUDENT CARD */}
          <Link to="/student-Assessment" className="Quiz-card">
            <div className="card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students in a classroom learning"
              />
              <span className="card-image-icon">🎒</span>
              <span className="card-audience">Ages 8–18</span>
            </div>
            <div className="card-body">
              <div className="card-tag">School Program</div>
              <h3 className="card-title">Student Leadership Assessment</h3>
              <p className="card-desc">Uncover your natural leadership strengths as a student. Discover how you inspire peers, handle challenges, and grow as a future leader.</p>
              <div className="card-meta">
                <span>12 Questions</span>
                <div className="meta-dot"></div>
                <span>5 min</span>
                <div className="meta-dot"></div>
                <span>Free</span>
              </div>
              <div className="card-btn">
                Start Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* CAMPUS CARD */}
          <Link to="/campus-Assessment" className="Quiz-card">
            <div className="card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80"
                alt="College students on campus"
              />
              <span className="card-image-icon">🎓</span>
              <span className="card-audience">Ages 18–25</span>
            </div>
            <div className="card-body">
              <div className="card-tag">College Program</div>
              <h3 className="card-title">Campus Leadership Assessment</h3>
              <p className="card-desc">Assess your readiness to lead in college environments. Explore your influence, communication style, and vision for your future career.</p>
              <div className="card-meta">
                <span>12 Questions</span>
                <div className="meta-dot"></div>
                <span>6 min</span>
                <div className="meta-dot"></div>
                <span>Free</span>
              </div>
              <div className="card-btn">
                Start Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* TEACHER CARD */}
          <Link to="/teacher-Assessment" className="Quiz-card">
            <div className="card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1561089489-f13d5e730d72?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Teacher mentoring students in a classroom"
              />
              <span className="card-image-icon">📚</span>
              <span className="card-audience">Educators</span>
            </div>
            <div className="card-body">
              <div className="card-tag">School Program</div>
              <h3 className="card-title">Teacher Leadership Assessment</h3>
              <p className="card-desc">Measure your impact as an educator and leader. Understand how you motivate, mentor, and model leadership for the next generation.</p>
              <div className="card-meta">
                <span>12 Questions</span>
                <div className="meta-dot"></div>
                <span>6 min</span>
                <div className="meta-dot"></div>
                <span>Free</span>
              </div>
              <div className="card-btn">
                Start Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* PARENT CARD */}
          <Link to="/parent-Assessment" className="Quiz-card">
            <div className="card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1476554123255-b0ff6b30dcd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHBhcmVudHN8ZW58MHx8MHx8fDA%3D"
                alt="Parent and child bonding together"
              />
              <span className="card-image-icon">🏡</span>
              <span className="card-audience">Families</span>
            </div>
            <div className="card-body">
              <div className="card-tag">Family Program</div>
              <h3 className="card-title">Parent Leadership Assessment</h3>
              <p className="card-desc">Reflect on your leadership style at home. Discover how you shape your child's values, confidence, and character through everyday actions.</p>
              <div className="card-meta">
                <span>12 Questions</span>
                <div className="meta-dot"></div>
                <span>5 min</span>
                <div className="meta-dot"></div>
                <span>Free</span>
              </div>
              <div className="card-btn">
                Start Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

        </div>
      </section>

      <section className="how-section">
        <div className="section-label">How It Works</div>
        <h2 className="section-title" style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '8px' }}>Simple. Insightful. Powerful.</h2>
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '15px', marginBottom: '48px' }}>Four easy steps to your leadership profile</p>
        <div className="steps-grid">
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-title">Choose Your Assessment</div>
            <div className="step-desc">Select the category that matches your role or age group.</div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-title">Answer 12 MCQs</div>
            <div className="step-desc">Thoughtful multiple-choice questions about real situations.</div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-title">Submit Your Info</div>
            <div className="step-desc">Enter your name & email on the final step to receive results.</div>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <div className="step-title">Get Your Profile</div>
            <div className="step-desc">Instantly see your leadership style with personalised remarks.</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
