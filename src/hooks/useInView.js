import { useEffect, useRef, useState } from "react";

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
        ...options,
      }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

export default useInView;