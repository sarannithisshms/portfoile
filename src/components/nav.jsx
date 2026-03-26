const Navbar = ({ navLinks, scrollTo }) => {
    return (
      <nav className="anim-nav fixed top-0 inset-x-0 z-50 flex justify-between items-center px-8 py-4 bg-[#060610]/80 backdrop-blur-2xl border-b border-violet-500/12">
        <span className="text-xl font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]">
          MSS<span className="text-violet-400">.Dev</span>
        </span>
  
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((id) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white hover:tracking-[0.14em] transition-all duration-150 font-mono"
              >
                {id}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Navbar;