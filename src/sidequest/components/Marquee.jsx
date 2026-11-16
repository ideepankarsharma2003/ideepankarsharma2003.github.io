import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { CONTENT } from "../data/content";

export default function Marquee() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const skew = useTransform(useVelocity(scrollY), [-2200, 2200], [-5, 5]);
  const skewSpring = useSpring(skew, { stiffness: 320, damping: 55 });
  const items = CONTENT.marquee;
  const seg = (hidden) => (
    <div
      className="flex items-center shrink-0"
      aria-hidden={hidden || undefined}
    >
      {items.map((t, i) => (
        <span key={`${t}-${i}`} className="flex items-center">
          <span className="font-display font-semibold tracking-tight text-xl sm:text-2xl text-sq-fg px-6 whitespace-nowrap">
            {t}
          </span>
          <svg
            viewBox="0 0 20 20"
            className="w-4 h-4 text-sq-fg/70"
            aria-hidden="true"
          >
            <path
              d="M10 1 v18 M1 10 h18 M3.5 3.5 l13 13 M16.5 3.5 l-13 13"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div
      data-testid="marquee"
      className="relative z-10 -rotate-1 -mx-4 my-2 bg-lime py-3 overflow-hidden shadow-[0_10px_50px_rgba(212,255,0,0.12)]"
      role="presentation"
    >
      <motion.div
        className="marquee-band"
        style={reduce ? {} : { skewY: skewSpring }}
      >
        {seg(false)}
        {seg(true)}
      </motion.div>
    </div>
  );
}
