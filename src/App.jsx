import { useState, useEffect, useRef } from "react";
import useInView from "./hooks/useInView";
import useCountUp from "./hooks/useCountup";
import Navbar from "./components/nav";
import ContactSection from "./components/contactsection";
import { SKILLS, EXPERIENCE, PROJECTS } from "./data/portfolioData";

/* ─── SMALL COMPONENTS ──────────────────────────────── */
const Tag = ({ label }) => (
  <span className="px-3 py-0.5 rounded-full text-xs font-semibold border border-violet-500/25 bg-violet-500/10 text-violet-400 transition-all duration-150 hover:bg-violet-500/25 hover:border-violet-400 hover:-translate-y-0.5 cursor-default select-none">
    {label}
  </span>
);

const SectionHeader = ({ label, title, accent }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`mb-10 transition-all duration-300 ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
      }`}
    >
      <p className="text-xs font-bold tracking-widest uppercase text-violet-400 mb-1 font-mono">
        {label}
      </p>
      <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
        {title} <span className="text-violet-400">{accent}</span>
      </h2>
    </div>
  );
};

/* ─── SKILL CARD ────────────────────────────────────── */
const SkillCard = ({ name, pct, delay }) => {
  const [ref, inView] = useInView();
  const [barW, setBarW] = useState(0);
  useEffect(() => {
    if (inView) setTimeout(() => setBarW(pct), delay);
  }, [inView, pct, delay]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative overflow-hidden rounded-2xl border border-violet-500/15 bg-[#0e0e1c] p-4
        transition-all duration-200
        hover:-translate-y-2 hover:scale-[1.03] hover:border-violet-400/55 hover:bg-[#151526]
        hover:shadow-[0_14px_48px_rgba(131,110,249,0.28)]
        ${
          inView
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-5 scale-[0.97]"
        }`}
    >
      {/* shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-300 pointer-events-none" />
      <div className="flex justify-between items-center mb-2.5">
        <span className="font-bold text-sm tracking-tight text-white">
          {name}
        </span>
        <span className="text-xs font-extrabold text-violet-400">{pct}%</span>
      </div>
      <div className="h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-teal-400 shadow-[0_0_10px_rgba(131,110,249,0.5)]"
          style={{
            width: `${barW}%`,
            transition: "width 0.55s cubic-bezier(.22,1,.36,1)",
          }}
        />
      </div>
    </div>
  );
};

/* ─── EXP CARD ──────────────────────────────────────── */
const ExpCard = ({ data, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div className="relative pl-6 mb-8">
      {/* dot */}
      <div className="absolute -left-[0.85rem] top-2.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-[#060610] shadow-[0_0_10px_rgba(131,110,249,0.7)] transition-all duration-150 group-hover:scale-150" />
      <div
        ref={ref}
        style={{ transitionDelay: `${delay}ms` }}
        className={`group border border-violet-500/15 bg-[#0e0e1c] rounded-2xl p-5
          transition-all duration-200
          hover:translate-x-2 hover:border-violet-400/40 hover:bg-[#151526]
          hover:shadow-[0_8px_44px_rgba(131,110,249,0.25)]
          ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}
      >
        <p className="font-black text-base tracking-tight">{data.company}</p>
        <div className="flex flex-wrap gap-3 mt-1 mb-2">
          <span className="text-xs font-semibold text-violet-400">
            {data.role}
          </span>
          <span className="text-xs text-white/40">{data.date}</span>
        </div>
        <p className="text-sm font-bold text-teal-400 mb-1.5 tracking-tight">
          {data.project}
        </p>
        <p className="text-sm text-white/50 leading-relaxed">{data.desc}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {data.tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── PROJECT CARD ──────────────────────────────────── */
const ProjCard = ({ data, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative overflow-hidden border border-violet-500/15 bg-[#0e0e1c] rounded-2xl p-5
        transition-all duration-200 cursor-default
        hover:-translate-y-2.5 hover:scale-[1.03] hover:border-violet-400/45 hover:bg-[#151526]
        hover:shadow-[0_20px_60px_rgba(131,110,249,0.28)]
        ${
          inView
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-5 scale-[0.96]"
        }`}
    >
      {/* top glow line */}
      <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div
        className="w-11 h-11 rounded-xl bg-violet-500/12 flex items-center justify-center text-2xl mb-3
        transition-all duration-150 group-hover:scale-125 group-hover:rotate-[-6deg] group-hover:bg-violet-500/22"
      >
        {data.icon}
      </div>
      <p className="font-black text-sm tracking-tight mb-0.5">{data.name}</p>
      <p className="text-[11px] font-bold text-orange-400 uppercase tracking-widest mb-2">
        {data.type}
      </p>
      <p className="text-xs text-white/45 leading-relaxed mb-3">{data.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {data.tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
    </div>
  );
};

/* ─── STAT ──────────────────────────────────────────── */
const Stat = ({ target, suffix, label, started }) => {
  const val = useCountUp(target, started, 700);
  return (
    <div>
      <p className="text-4xl font-black tracking-tighter leading-none">
        {val}
        <span className="text-violet-400">{suffix}</span>
      </p>
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mt-1">
        {label}
      </p>
    </div>
  );
};

/* ─── MAIN APP ──────────────────────────────────────── */
export default function Portfolio() {
  const [statsStarted, setStatsStarted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const statsRef = useRef(null);
  const name = "M.S.Sarannithissh";

  const [displayed, setDisplayed] = useState("");
  const cursorRef = useRef(null);

  useEffect(() => {
    if (displayed.length < name.length) {
      const timeout = setTimeout(
        () => setDisplayed(name.slice(0, displayed.length + 1)),
        100
      );
      return () => clearTimeout(timeout);
    } else {
      if (cursorRef.current) {
        cursorRef.current.style.display = "none";
      }
    }
  }, [displayed]);

  /* cursor glow */
  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  /* stats count-up trigger */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsStarted(true);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* nav active section highlight */
  const navLinks = ["skills", "experience", "projects", "contact"];
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#060610] text-white font-sans overflow-x-hidden relative">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
        * { font-family: 'Outfit', sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace !important; }
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(-28px,28px) scale(1.07)}}
        @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(22px,-22px) scale(1.06)}}
        @keyframes float3{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-18px) scale(1.1)}}
        @keyframes navIn{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes lineUp{from{opacity:0;transform:translateY(110%)}to{opacity:1;transform:translateY(0)}}
        @keyframes blinkDot{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(139,92,246,.7)}55%{opacity:.3;box-shadow:0 0 0 6px rgba(139,92,246,0)}}
        .anim-nav{animation:navIn .35s cubic-bezier(.22,1,.36,1) both}
        .anim-tag{animation:fadeUp .3s .1s cubic-bezier(.22,1,.36,1) both;opacity:0}
        .anim-line1{animation:lineUp .38s .2s cubic-bezier(.22,1,.36,1) both;opacity:0}
        .anim-line2{animation:lineUp .38s .3s cubic-bezier(.22,1,.36,1) both;opacity:0}
        .anim-role{animation:fadeUp .3s .44s cubic-bezier(.22,1,.36,1) both;opacity:0}
        .anim-sub{animation:fadeUp .3s .54s cubic-bezier(.22,1,.36,1) both;opacity:0}
        .anim-cta{animation:fadeUp .3s .64s cubic-bezier(.22,1,.36,1) both;opacity:0}
        .anim-stats{animation:fadeUp .3s .8s cubic-bezier(.22,1,.36,1) both;opacity:0}
        .dot-blink{animation:blinkDot 1.8s ease-in-out infinite}
        .outline-text{color:transparent;-webkit-text-stroke:2px rgb(139 92 246)}
        .grain::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");pointer-events:none;z-index:9999;opacity:.4}
      `}</style>

      {/* GRAIN */}
      <div className="grain" />

      {/* CURSOR GLOW */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%,-50%)",
          transition: "left .18s ease, top .18s ease",
        }}
      />

      {/* ── NAV ── */}
      <Navbar navLinks={navLinks} scrollTo={scrollTo} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-28 pb-12 overflow-hidden">
        {/* orbs */}
        <div
          className="absolute rounded-full pointer-events-none blur-[100px] w-[680px] h-[680px] bg-violet-600/10 -top-40 -right-44"
          style={{ animation: "float1 10s ease-in-out infinite" }}
        />
        <div
          className="absolute rounded-full pointer-events-none blur-[100px] w-[380px] h-[380px] bg-teal-500/7 -bottom-10 -left-20"
          style={{ animation: "float2 7s ease-in-out infinite" }}
        />
        <div
          className="absolute rounded-full pointer-events-none blur-[100px] w-[220px] h-[220px] bg-orange-500/6 top-[45%] left-[48%]"
          style={{ animation: "float3 5s ease-in-out infinite" }}
        />

        <div className="relative z-10 max-w-5xl w-full">
          {/* tag */}
          <div className="anim-tag inline-flex items-center gap-2.5 bg-violet-500/10 border border-violet-500/28 px-4 py-1.5 rounded-full text-xs text-violet-400 font-bold uppercase tracking-widest mb-6">
            <span className="dot-blink w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
            Open to Opportunities
          </div>
          <h1
            className="text-[clamp(2rem,8vw,6rem)] font-normal leading-[1.1] tracking-wide overflow-hidden "
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: "rgb(139,92,246)",
              textShadow: "0 0 30px rgba(139,92,246,0.8)",
            } }
          >
            {displayed}
            <span ref={cursorRef} className="animate-pulse opacity-60">|</span>
          </h1>

          <p className="anim-role mt-4 text-lg md:text-2xl font-light text-white/50 tracking-wide">
            <strong className="font-extrabold text-white">
              Software Developer II
            </strong>
            <span className="mx-3 text-white/20">·</span>
            5+ Years Experience
          </p>

          <p className="anim-sub mt-2 text-sm text-white/40 max-w-lg leading-relaxed font-normal">
            React Native · React JS · Next JS · Flutter · Angular — building
            fast, beautiful, production-grade apps for mobile & web. 
          </p>

          <div className="anim-cta flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => scrollTo("experience")}
              className="px-7 py-3 bg-violet-500 text-white font-bold rounded-xl text-sm tracking-wide shadow-[0_0_32px_rgba(139,92,246,0.5)] transition-all duration-150 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_60px_rgba(139,92,246,0.75)] active:scale-95"
            >
              Career Journey
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="px-7 py-3 bg-transparent text-white font-bold rounded-xl text-sm tracking-wide border border-violet-500/20 transition-all duration-150 hover:bg-violet-500/10 hover:border-violet-400 hover:-translate-y-1 active:scale-95"
            >
              Let's Connect
            </button>
            <a
              href={`${import.meta.env.BASE_URL}/resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              //download="Sarannithissh_Resume.pdf"
              className="px-7 py-3 bg-violet-500 text-white font-bold rounded-xl text-sm tracking-wide shadow-[0_0_32px_rgba(139,92,246,0.5)] transition-all duration-150 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_60px_rgba(139,92,246,0.75)] active:scale-95"
            >
              Explore Resume
            </a>
          </div>

          {/* STATS */}
          <div
            ref={statsRef}
            className="anim-stats flex flex-wrap gap-12 mt-14"
          >
            <Stat
              target={5}
              suffix="+"
              label="Years Exp."
              started={statsStarted}
            />
            <Stat
              target={10}
              suffix="+"
              label="Apps Built"
              started={statsStarted}
            />
            <Stat
              target={6}
              suffix=""
              label="Companies"
              started={statsStarted}
            />
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <SectionHeader
          label="What I work with"
          title="Skills &"
          accent="Tech Stack"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.name} name={s.name} pct={s.pct} delay={i * 55} />
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section
        id="experience"
        className="max-w-5xl mx-auto px-6 md:px-12 py-24"
      >
        <SectionHeader
          label="Career Journey"
          title="Work"
          accent="Experience"
        />
        <div className="relative pl-6">
          {/* vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500 to-transparent" />
          {EXPERIENCE.map((e, i) => (
            <ExpCard key={e.company} data={e} delay={i * 70} />
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <SectionHeader label="Portfolio" title="Featured" accent="Projects" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <ProjCard key={p.name} data={p} delay={i * 70} />
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        {/* <ContactSection /> */}
        <ContactSection />
      </section>

      <footer className="text-center py-6 border-t border-violet-500/10 text-xs text-white/25 tracking-widest font-mono uppercase">
        Designed & Built for M.S. Sarannithissh · 2026
      </footer>
    </div>
  );
}
