import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CONTENT } from "../data/content";
import { Eyebrow, Reveal, Label, GhostNumber } from "./bits";
import PlayableFilm from "./PlayableFilm";

const C = CONTENT.chapters.curiosity;

export default function ChapterC() {
  const [mode, setMode] = useState("moment");
  const reduce = useReducedMotion();
  const rows = C.story[mode];

  return (
    <section
      id="curiosity"
      className="relative py-24 sm:py-32 bg-sq-paper text-sq-fg paper-grain scroll-mt-16 overflow-x-clip"
    >
      <GhostNumber n="03" light />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <Eyebrow tone="text-sq-sage">{C.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display font-semibold tracking-tight leading-[1.02] text-[clamp(2rem,4.6vw,4.2rem)]">
            Follow{" "}
            <em className="font-serifit italic font-normal text-sq-sage">
              Curiosity.
            </em>
          </h2>
          <p className="mt-5 max-w-2xl text-sq-fg/70 text-base leading-relaxed">
            {C.intro}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="flex gap-2" role="group" aria-label="Story mode">
            {Object.entries(C.modes).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={mode === key}
                data-testid={`curiosity-mode-${key}`}
                onClick={() => setMode(key)}
                className={`px-5 py-3 font-mono text-[11px] tracking-[0.2em] uppercase border transition-all duration-300 ${
                  mode === key
                    ? "bg-sq-fg text-sq-bg border-sq-fg"
                    : "border-sq-fg/25 text-sq-fg/60 hover:border-sq-fg"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-6">
          <div
            data-testid="curiosity-frame"
            className="relative border border-sq-fg/15 overflow-hidden aspect-[16/9] bg-sq-bg"
          >
            <PlayableFilm
              videoId={C.video.id}
              title={C.video.title}
              showCaption={false}
              url={C.video.url}
              className="h-full border-0"
            />
            <AnimatePresence>
              {mode === "framed" && (
                <motion.div
                  data-testid="framing-overlay"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 800 450"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <g stroke="#F4F1E8" strokeWidth="1.4" opacity="0.7">
                      <line
                        x1="266"
                        y1="0"
                        x2="266"
                        y2="450"
                        strokeDasharray="5 9"
                      />
                      <line
                        x1="533"
                        y1="0"
                        x2="533"
                        y2="450"
                        strokeDasharray="5 9"
                      />
                      <line
                        x1="0"
                        y1="150"
                        x2="800"
                        y2="150"
                        strokeDasharray="5 9"
                      />
                      <line
                        x1="0"
                        y1="300"
                        x2="800"
                        y2="300"
                        strokeDasharray="5 9"
                      />
                    </g>
                    <g stroke="#D4FF00" strokeWidth="3" fill="none">
                      <path d="M24 54 v-30 h30 M776 54 v-30 h-30 M24 396 v30 h30 M776 396 v30 h-30" />
                    </g>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
            <span
              data-testid="curiosity-footage-chip"
              className="absolute top-4 left-4 chip bg-sq-paper/90 !text-sq-fg !border-sq-fg/30"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-neon-mint"
                aria-hidden="true"
              />
              {C.footageChip}
            </span>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 grid sm:grid-cols-2 gap-5"
          >
            {rows.map((r) => (
              <div
                key={r.k}
                data-testid={`curiosity-row-${r.k.toLowerCase()}`}
                className={`border p-5 ${r.status === "placeholder" ? "border-dashed border-sq-muted/70 bg-transparent" : "border-sq-fg/15 bg-sq-paper/60"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <Label tone="text-sq-sage">{r.k}</Label>
                  <span
                    className={`chip ${r.status === "placeholder" ? "chip-placeholder" : r.status === "draft" ? "chip-draft" : "!text-sq-fg !border-sq-fg/30"}`}
                  >
                    {r.status === "placeholder"
                      ? "AWAITING HIS NOTE"
                      : r.status === "draft"
                        ? "DRAFT — SIGN OFF, DEEPANKAR"
                        : "FROM THE FILM"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-sq-fg/80">
                  {r.v}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.05} className="mt-14">
          <Label tone="text-sq-sage">{C.moreLabel}</Label>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {C.more.map((f, i) => (
              <Reveal key={f.videoId} delay={i * 0.06}>
                <PlayableFilm
                  videoId={f.videoId}
                  title={f.title}
                  url={`https://www.youtube.com/watch?v=${f.videoId}`}
                />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
