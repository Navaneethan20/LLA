import Footer from "./components/Navbar";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen bg-[#0B1832]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        :root {
          --navy-dark: #0B1832;
          --navy-mid: #112244;
          --gold: #D4AF37;
          --gold-light: #F0CE6A;
        }
        * { box-sizing: border-box; font-family: 'Plus Jakarta Sans', sans-serif; }
        body { background-color: #0B1832; color: white; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .float { animation: float 5s ease-in-out infinite; }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.2); }
          50% { box-shadow: 0 0 50px rgba(212, 175, 55, 0.5); }
        }
        .pulse-gold { animation: pulse-glow 3s ease-in-out infinite; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0B1832; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; }
      `}</style>
      {children}
      
    </div>
  );
}