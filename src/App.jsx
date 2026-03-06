import { useState, useEffect } from "react";

const SEO = () => {
  useEffect(() => {
    document.title = "Brendan Walker | Full Stack Web Developer";
    const setMeta = (name, content, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Full Stack Web Developer based in Victoria, BC. Specializing in React, Ruby on Rails, TypeScript, and modern web technologies.");
    setMeta("keywords", "Full Stack Developer, React, Ruby on Rails, TypeScript, Victoria BC, Web Developer");
    setMeta("author", "Brendan Walker");
    setMeta("og:title", "Brendan Walker | Full Stack Web Developer", true);
    setMeta("og:description", "Experienced Full Stack Developer passionate about intuitive UI and clean code.", true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "Brendan Walker | Full Stack Web Developer");
  }, []);
  return null;
};

const BOOT_LINES = [
  { text: "BIOS v2.4.1 — Brendan Walker Systems", delay: 0 },
  { text: "RAM: 64MB Creative Memory ........... OK", delay: 280 },
  { text: "  [react.js] [rails.rb] [typescript.ts]", delay: 520 },
  { text: "NET: brenny.walker@gmail.com ........ ONLINE", delay: 780 },
  { text: "$ run portfolio --mode=interactive", delay: 1100 },
];

function StartupScreen({ onDone }) {
  const [phase, setPhase] = useState("off");
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    setTimeout(() => setPhase("flicker"), 150);
    setTimeout(() => setPhase("boot"), 700);

    BOOT_LINES.forEach(({ text, delay }) =>
      setTimeout(() => setVisibleLines(p => [...p, text]), 700 + delay)
    );

    setTimeout(() => {
      setPhase("load");
      let p = 0;
      const iv = setInterval(() => {
        p += 100 / 16;
        setProgress(Math.min(p, 100));
        if (p >= 100) {
          clearInterval(iv);
          setTimeout(() => setPhase("done"), 250);
          setTimeout(onDone, 600);
        }
      }, 100);
    }, 700 + 1500);

    const cur = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(cur);
  }, []);

  const barLen = 34;
  const filled = Math.round((progress / 100) * barLen);
  const bar = "█".repeat(filled) + "░".repeat(barLen - filled);
  const loadLabel = progress < 35 ? "Loading assets..." : progress < 70 ? "Compiling components..." : progress < 95 ? "Rendering UI..." : "Ready.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{ opacity: phase === "done" ? 0 : 1, transition: "opacity 0.5s", pointerEvents: phase === "done" ? "none" : "all" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.13) 2px,rgba(0,0,0,0.13) 4px)" }} />
      <div className="absolute inset-0" style={{
        background: phase === "off" ? "black" : "radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, black 70%)",
        animation: phase === "flicker" ? "flicker 0.55s steps(1) forwards" : "none",
      }} />

      <div className="relative w-full max-w-xl mx-4 rounded-lg overflow-hidden border border-green-900"
        style={{ boxShadow: phase === "off" ? "none" : "0 0 50px rgba(34,197,94,0.2)", opacity: phase === "off" ? 0 : 1, transition: "opacity 0.1s, box-shadow 0.4s" }}>
        <div className="bg-green-950 px-4 py-2 flex items-center gap-2 border-b border-green-900">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 opacity-70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-70" />
          <span className="font-mono text-xs text-green-700 ml-2">bw-system ~ boot</span>
        </div>
        <div className="bg-black p-6 font-mono text-sm min-h-64" style={{ textShadow: "0 0 7px rgba(34,197,94,0.55)" }}>
          <div className="space-y-1.5 mb-4">
            {visibleLines.map((l, i) => (
              <div key={i} className={l.startsWith("$") ? "text-green-200 mt-3" : l.startsWith("  ") ? "text-green-600" : "text-green-500"}
                style={{ animation: "fadeSlide 0.2s ease-out" }}>{l}</div>
            ))}
          </div>
          {phase === "load" && (
            <div style={{ animation: "fadeSlide 0.3s ease-out" }}>
              <div className="text-green-400 mb-1.5 text-xs">[{bar}] {Math.round(progress)}%</div>
              <div className="text-green-700 text-xs">{loadLabel}</div>
            </div>
          )}
          {phase !== "load" && <span className="inline-block w-2 h-3.5 bg-green-400" style={{ opacity: cursor ? 1 : 0 }} />}
        </div>
      </div>

      <style>{`
        @keyframes flicker { 0%{opacity:0}20%{opacity:1}22%{opacity:0.2}24%{opacity:1}60%{opacity:0.85}62%{opacity:0.15}64%{opacity:1}100%{opacity:1} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:none} }
      `}</style>
    </div>
  );
}

const SKILLS = ["React", "React Native", "TypeScript", "Ruby on Rails", "Node.js", "Vue.js", "PostgreSQL", "Next.js", "Redux", "Docker"];

const JOBS = [
  { role: "Senior Developer", company: "Jane Software", period: "Nov 2021 – Present", desc: "Core scheduling team. Built group bookings, overhauled telehealth, leading new patient booking mobile app.", stack: ["Rails", "React", "React Native", "Redux", "PostgreSQL"] },
  { role: "Full Stack Developer", company: "Cuboh Software", period: "Feb – Aug 2021", desc: "Rebuilt order management Android app with React Native. Printer integration, KDS, and push notifications.", stack: ["React Native", "TailwindCSS", "SQLite"] },
  { role: "Software Developer", company: "AppColony Inc.", period: "Jul 2019 – Jan 2021", desc: "Features & bug fixes on main Rails app. Led full UI overhaul and third-party integrations.", stack: ["Rails", "Vue.js", "PostgreSQL"] },
  { role: "Full Stack Developer", company: "FreshWorks Studio", period: "May 2017 – Jun 2019", desc: "Built frontend & backend for many clients. Mentored new hires, interviewed devs, drove CI/CD.", stack: ["React", "Redux", "Node.js", "Laravel"] },
];

const PROJECTS = [
  { name: "Jane", desc: "All-in-one clinic platform — bookings, telehealth, invoicing, and payments.", url: "https://jane.app", stack: ["Rails", "React", "React Native"] },
  { name: "Cuboh Mobile", desc: "Restaurant app aggregating Uber Eats, GrubHub & DoorDash orders.", url: "https://cuboh.com", stack: ["React Native", "SQLite"] },
  { name: "MakeShift", desc: "50K+ user workforce scheduling with payroll/HR integration.", url: "https://makeshift.ca", stack: ["Rails", "VueJS", "Tailwind"] },
  { name: "A Place For Mom CA", desc: "Senior care referral site with SSR, UI library, and SEO optimization.", url: "https://ca.aplaceformom.com", stack: ["React", "Next.js", "TypeScript"] },
  { name: "Donate Life Canada", desc: "National organ & tissue donor registration portal.", url: "#", stack: ["React", "Redux", "Lumen"] },
  { name: "Swift Editor", desc: "Real-time collaborative writing platform with invoicing.", url: "#", stack: ["React", "Pusher.js", "Stripe"] },
  { name: "Covault", desc: "Asset management platform where brands invite users, upload assets, build ad sets, and launch promotional campaigns.", url: "#", stack: ["React", "Redux", "Jest", "Node.js"] },
  { name: "Revved Up", desc: "Online vehicle bidding app where dealers auction cars, chat in real time, and search for local wholesalers.", url: "#", stack: ["React", "Redux", "Deepstream.io", "Material UI", "Node.js"] },
];

function GlitchText({ text }) {
  const [g, setG] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => { setG(true); setTimeout(() => setG(false), 120); }, 4500);
    return () => clearInterval(iv);
  }, []);
  return <span style={g ? { textShadow: "2px 0 #ff00ff, -2px 0 #00ffff" } : {}}>{text}</span>;
}

function Tag({ label }) {
  return <span className="text-xs font-mono px-2 py-0.5 bg-green-950 border border-green-900 text-green-600 rounded">{label}</span>;
}

export default function App() {
  const [booted, setBooted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = ["about", "experience", "projects", "contact"];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-x-hidden">
      <SEO />
      <StartupScreen onDone={() => setBooted(true)} />

      {/* CRT overlay */}
      <div className="pointer-events-none fixed inset-0 z-40" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)" }} />
      <div className="pointer-events-none fixed inset-0 z-40" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)" }} />
      <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundImage: "linear-gradient(rgba(34,197,94,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.03) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-30 border-b border-green-950 bg-gray-950/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-mono font-bold text-green-400 tracking-wider" style={{ textShadow: "0 0 10px rgba(34,197,94,0.4)" }}>
            bw<span className="text-green-700">@dev</span><span className="animate-pulse text-green-500">_</span>
          </span>
          {/* Desktop nav */}
          <div className="flex items-center gap-8" style={{ display: "flex" }}>
            <div style={{ display: window.innerWidth < 640 ? "none" : "flex", gap: "2rem", alignItems: "center" }}>
              {navLinks.map(n => (
                <a key={n} href={`#${n}`}
                  className="font-mono text-xs text-green-600 hover:text-green-300 uppercase tracking-widest transition-colors">
                  {n}
                </a>
              ))}
              <a href="mailto:brenny.walker@gmail.com"
                className="font-mono text-xs px-3 py-1.5 border border-green-800 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-200 rounded tracking-widest uppercase"
                style={{ boxShadow: "0 0 8px rgba(34,197,94,0.15)" }}>
                hire me
              </a>
            </div>
            {/* Mobile burger */}
            <button className="font-mono text-green-500 text-lg leading-none focus:outline-none"
              style={{ display: window.innerWidth < 640 ? "block" : "none" }}
              onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {/* Mobile dropdown */}
        <div style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "16rem" : "0",
          transition: "max-height 0.3s ease",
          background: "rgba(3,7,18,0.97)",
          borderTop: menuOpen ? "1px solid rgba(20,83,45,0.3)" : "none",
          display: isMobile ? "block" : "none",
        }}>
          <div className="flex flex-col px-6 py-4 gap-5">
            {navLinks.map(n => (
              <a key={n} href={`#${n}`} onClick={() => setMenuOpen(false)}
                className="font-mono text-sm text-green-600 hover:text-green-300 uppercase tracking-widest transition-colors">{n}</a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20"
        style={{ opacity: booted ? 1 : 0, transition: "opacity 0.6s ease-in" }}>

        {/* HERO */}
        <section id="about" className="flex flex-col justify-center py-20 border-b border-green-950">
          <p className="font-mono text-green-700 text-xs tracking-widest uppercase mb-4">// Full Stack Web Developer</p>
          <h1 className="text-5xl font-bold mb-5 leading-none" style={{ textShadow: "0 0 40px rgba(34,197,94,0.2)", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            <GlitchText text="Brendan" />{" "}
            <span className="text-green-400">Walker</span>
          </h1>
          <p className="text-gray-500 leading-relaxed mb-8 text-sm">
            8+ years building intuitive, performant web and mobile products. Currently at <span className="text-green-400">Jane Software</span> in Victoria, BC.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {SKILLS.map(s => <Tag key={s} label={s} />)}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:brenny.walker@gmail.com" className="font-mono text-xs text-green-700 hover:text-green-400 transition-colors">[email]</a>
            <a href="https://github.com/brendonion" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-green-700 hover:text-green-400 transition-colors">[github]</a>
            <a href="https://linkedin.com/in/brendan-walker-0a728713b" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-green-700 hover:text-green-400 transition-colors">[linkedin]</a>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-20 border-b border-green-950">
          <h2 className="font-mono text-xs text-green-700 uppercase tracking-widest mb-10">// Experience</h2>
          <div className="space-y-10">
            {JOBS.map((job, i) => (
              <div key={i} className="group">
                <p className="font-mono text-xs text-green-800 mb-1">{job.period}</p>
                <h3 className="font-bold text-green-300 font-mono mb-0.5 group-hover:text-green-100 transition-colors">{job.role}</h3>
                <p className="text-green-700 font-mono text-xs mb-3">{job.company}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{job.desc}</p>
                <div className="flex flex-wrap gap-1.5">{job.stack.map(s => <Tag key={s} label={s} />)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 border-b border-green-950">
          <h2 className="font-mono text-xs text-green-700 uppercase tracking-widest mb-10">// Projects</h2>
          <div className="grid grid-cols-1 gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {PROJECTS.map((p, i) => (
              <a key={i} href={p.url !== "#" ? p.url : undefined}
                target={p.url !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block border border-green-950 rounded-lg p-5 hover:border-green-800 transition-colors group bg-black/20"
                style={{ cursor: p.url === "#" ? "default" : "pointer" }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-mono font-bold text-green-300 group-hover:text-green-100 transition-colors">{p.name}</h3>
                  {p.url !== "#" && <span className="font-mono text-xs text-green-800 group-hover:text-green-500 transition-colors">↗</span>}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">{p.stack.map(s => <Tag key={s} label={s} />)}</div>
              </a>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20">
          <h2 className="font-mono text-xs text-green-700 uppercase tracking-widest mb-10">// Contact</h2>
          <div className="max-w-sm">
            <p className="text-gray-500 text-sm leading-relaxed mb-8">Open to new challenges and interesting projects. Let's build something together.</p>
            <div className="space-y-3">
              {[
                { label: "email", value: "brenny.walker@gmail.com", href: "mailto:brenny.walker@gmail.com" },
                { label: "github", value: "github.com/brendonion", href: "https://github.com/brendonion" },
                { label: "linkedin", value: "linkedin.com/in/brendan-walker", href: "https://linkedin.com/in/brendan-walker-0a728713b" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 font-mono text-sm text-gray-600 hover:text-green-400 transition-colors group">
                  <span className="text-green-900 group-hover:text-green-600 shrink-0" style={{ minWidth: "6rem" }}>[{c.label}]</span>
                  <span>{c.value}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-green-950 py-5 text-center font-mono text-xs text-green-950">
        Brendan Walker © {(new Date()).getFullYear()} &nbsp;·&nbsp; Victoria, BC
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}