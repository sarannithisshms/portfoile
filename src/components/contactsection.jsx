import useInView from "../hooks/useInView";

const ContactSection = () => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden border border-violet-500/15 bg-[#0e0e1c] rounded-3xl p-10 md:p-16 text-center transition-all duration-300 ${
        inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.93]"
      }`}
    >
      {/* bg glow */}
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[460px] h-[460px] rounded-full bg-gradient-radial from-violet-600/10 to-transparent pointer-events-none" />

      <p className="text-xs font-bold tracking-widest uppercase text-violet-400 mb-2 font-mono">
        Let's connect
      </p>

      <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-3">
        Open to new <span className="text-violet-400">opportunities</span>
      </h2>

      <p className="text-white/45 max-w-md mx-auto mb-8 text-sm leading-relaxed">
        Looking for a passionate mobile & web developer? Let's build something
        great together.
      </p>

      <a
        href="mailto:sarannithisshhack@gmail.com"
        className="inline-block px-8 py-3 bg-violet-500 text-white font-bold rounded-xl text-sm tracking-wide shadow-[0_0_32px_rgba(139,92,246,0.5)] transition-all duration-150 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_60px_rgba(139,92,246,0.75)] active:scale-95"
      >
        Send an Email
      </a>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {[
          { icon: "📞", text: "8015585512" },
          { icon: "📍", text: "Sulur, Coimbatore – 641402" },
          { icon: "✉️", text: "sarannithisshhack@gmail.com" },
        ].map((c) => (
          <div
            key={c.text}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors duration-150 cursor-default"
          >
            <span>{c.icon}</span>
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;