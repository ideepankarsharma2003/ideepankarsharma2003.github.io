import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";

export const Magnetic = ({ children, strength = 0.3 }) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      className="inline-block"
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

export const GhostNumber = ({ n, light = false }) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      data-testid={`ghost-${n}`}
      style={{ y: reduce ? 0 : y }}
      className={`pointer-events-none select-none absolute top-4 right-2 sm:right-8 font-display font-semibold text-[9rem] sm:text-[14rem] leading-none ${
        light ? "text-sq-fg/[0.05]" : "text-sq-fg/[0.045]"
      }`}
    >
      {n}
    </motion.span>
  );
};

export const Reveal = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const Eyebrow = ({ children, tone = "text-sq-accent" }) => (
  <p className={`font-mono text-[11px] tracking-[0.3em] uppercase ${tone}`}>
    {children}
  </p>
);

export const Label = ({ children, tone = "text-sq-muted" }) => (
  <p className={`font-mono text-[10px] tracking-[0.25em] uppercase ${tone}`}>
    {children}
  </p>
);
