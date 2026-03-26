// hooks/useCountUp.js

import { useEffect, useState } from "react";

function useCountUp(target, start = false, duration = 700) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);

      setVal(Math.floor(progress * target));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setVal(target);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return val;
}

export default useCountUp;