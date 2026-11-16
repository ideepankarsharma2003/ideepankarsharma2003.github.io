import { motion } from "framer-motion";
import { CONTENT } from "../data/content";
import { useUI } from "../context/UIContext";
import { Magnetic } from "./bits";
import { Eyebrow } from "./bits";

const H = CONTENT.hero;

function fancy(text) {
  const parts = text.split("‘what if’");
  if (parts.length === 1) return text;
  return (
    <>
      {parts[0]}
      <em className="font-serifit italic font-normal text-sq-accent">
        ‘what if’
      </em>
      {parts[1]}
    </>
  );
}

const objectIcons = {
  terminal: (
    <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
      <rect
        x="4"
        y="7"
        width="32"
        height="22"
        rx="3"
        fill="none"
        stroke="#00F0FF"
        strokeWidth="2"
      />
      <path
        d="M8 14 h10 M8 19 h16"
        stroke="#00F0FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 29 v4 M10 33 h20"
        stroke="#2A2E33"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  chairs: (
    <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
      <path
        d="M8 8 v14 h12 v12 M8 22 v12 M28 8 v14 h-6"
        fill="none"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 22 h8 v10"
        fill="none"
        stroke="#FF6B35"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 40 40" className="w-10 h-10" aria-hidden="true">
      <rect
        x="4"
        y="12"
        width="24"
        height="16"
        rx="3"
        fill="none"
        stroke="#2EF8A0"
        strokeWidth="2"
      />
      <circle
        cx="16"
        cy="20"
        r="4.5"
        fill="none"
        stroke="#2EF8A0"
        strokeWidth="2"
      />
      <path
        d="M28 16 h8 M32 20 l-6 6 M20 32 l-4 6 M24 32 l4 6"
        stroke="#2EF8A0"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function Hero() {
  const ui = useUI();
  const line = (i) => ({
    initial: false,
    animate: { y: 0 },
    transition: {
      duration: 0.95,
      delay: 0.12 + i * 0.13,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <section
      id="top"
      className="sq-hero relative min-h-screen flex items-center overflow-hidden pt-28 pb-16"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-lime/[0.05] blur-[120px]" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-cyan/[0.04] blur-[120px]" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.13]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="dots"
              width="34"
              height="34"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.5" cy="1.5" r="1.2" fill="#3a3f46" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        <div className="order-2 lg:order-2 lg:col-span-6 xl:col-span-5">
          <motion.div
            data-testid="hero-portrait"
            initial={false}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative border border-sq-line overflow-hidden"
          >
            <img
              src={H.portraitBig}
              alt="Deepankar Sharma — builder, community maker, filmmaker"
              className="w-full aspect-[4/5] object-cover"
              width="640"
              height="800"
              fetchPriority="high"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/10 to-transparent"
              aria-hidden="true"
            />
            <span
              className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-sq-accent"
              aria-hidden="true"
            />
            <span
              className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-sq-accent"
              aria-hidden="true"
            />
            <span
              className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-sq-accent"
              aria-hidden="true"
            />
            <span
              className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-sq-accent"
              aria-hidden="true"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 sq-image-caption">
              <span
                data-testid="hero-portrait-caption"
                className="chip chip-lime"
              >
                {H.portraitCaption}
              </span>
              <p className="mt-3 font-display font-semibold tracking-tight text-2xl text-sq-fg">
                {H.portraitName}
              </p>
              <p className="font-mono text-[9px] tracking-[0.18em] text-sq-muted uppercase mt-1">
                {H.portraitLocation}
              </p>
              <p className="font-mono text-[9px] tracking-[0.18em] text-sq-accent uppercase mt-0.5">
                {H.portraitRoles}
              </p>
            </div>
            {H.objects.map((o, i) => (
              <motion.button
                key={o.id}
                data-testid={`hero-chip-${o.id}`}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.2, duration: 0.5 }}
                onClick={() => ui.goTo(o.target)}
                className={`absolute ${i === 0 ? "top-[5%] left-3" : i === 1 ? "top-[44%] right-3" : "bottom-[26%] left-5"} z-10 flex items-center gap-2.5 bg-sq-bg/85 backdrop-blur-md border border-sq-line hover:border-sq-accent px-3.5 py-2.5 transition-colors animate-floaty`}
                style={{ animationDelay: `${0.4 + i * 0.9}s` }}
              >
                {objectIcons[o.id]}
                <span className="font-mono text-[9px] tracking-[0.16em] text-sq-fg whitespace-nowrap">
                  {o.caption}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div className="order-1 lg:order-1 lg:col-span-6 xl:col-span-7">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <Eyebrow>{H.eyebrow}</Eyebrow>
          </motion.div>

          <h1 className="mt-6 font-display font-semibold tracking-tight leading-[0.98] text-[clamp(2.7rem,7.2vw,6.4rem)]">
            <span className="mask-line">
              <motion.span {...line(0)}>{fancy(H.lineA)}</motion.span>
            </span>
            <span className="mask-line">
              <motion.span {...line(1)}>{H.lineB}</motion.span>
            </span>
            <span className="mask-line">
              <motion.span {...line(2)} className="text-sq-accent">
                {H.lineC}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            data-testid="hero-subline"
            className="mt-6 max-w-md text-sq-muted text-base sm:text-lg leading-relaxed"
          >
            {H.subline}
          </motion.p>

          <motion.p
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-5 font-mono text-[11px] tracking-[0.3em] text-sq-subtle uppercase"
            data-testid="hero-strap"
          >
            {H.strap}
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <button
                data-testid="hero-cta-primary"
                onClick={() => ui.goTo("sidequest")}
                className="btn-primary"
              >
                {H.primaryCta}
                <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden="true">
                  <path
                    d="M10 3 v12 M4 10 l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Magnetic>
            <Magnetic>
              <button
                data-testid="hero-cta-secondary"
                onClick={() => ui.goTo("intelligence")}
                className="btn-ghost"
              >
                {H.secondaryCta}
              </button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-8 flex items-center gap-3"
            data-testid="hero-identity"
          >
            <span
              className="w-2 h-2 rounded-full bg-lime animate-pulseDot"
              aria-hidden="true"
            />
            <p className="font-mono text-[10px] tracking-[0.22em] text-sq-muted uppercase">
              {H.portraitName} — {H.portraitLocation}
            </p>
          </motion.div>

          <motion.button
            data-testid="hero-skip"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            onClick={() => ui.goTo("sidequest")}
            className="mt-12 font-mono text-[11px] tracking-[0.25em] uppercase text-sq-subtle hover:text-sq-accent transition-colors link-underline"
          >
            {H.skip} ↓
          </motion.button>
        </div>
      </div>
    </section>
  );
}
